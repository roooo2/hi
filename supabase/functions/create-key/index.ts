import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreateKeyRequest {
  plan: 'free' | 'pro' | 'premium'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Invalid user')
    }

    // Parse request body
    const { plan }: CreateKeyRequest = await req.json()

    // Get user profile to check limits
    const { data: userProfile, error: profileError } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      throw new Error('User profile not found')
    }

    // Check plan limits
    const planLimits = {
      free: 10,
      pro: 100,
      premium: Infinity,
    }

    const { data: existingLicenses, error: licenseError } = await supabaseClient
      .from('licenses')
      .select('id')
      .eq('user_id', user.id)

    if (licenseError) {
      throw new Error('Failed to check existing licenses')
    }

    const currentCount = existingLicenses?.length || 0
    const limit = planLimits[userProfile.plan]

    if (currentCount >= limit) {
      throw new Error(`Plan limit reached: ${limit} keys maximum`)
    }

    // Generate a unique license key
    const generateKey = () => {
      const prefix = plan === 'premium' ? 'PREM' : plan === 'pro' ? 'PRO' : 'FREE'
      const timestamp = Date.now().toString(36)
      const random = Math.random().toString(36).substring(2, 15)
      return `${prefix}-${timestamp}-${random}`.toUpperCase()
    }

    let licenseKey = generateKey()
    let attempts = 0
    const maxAttempts = 5

    // Ensure key is unique
    while (attempts < maxAttempts) {
      const { data: existing } = await supabaseClient
        .from('licenses')
        .select('id')
        .eq('key', licenseKey)
        .single()

      if (!existing) break

      licenseKey = generateKey()
      attempts++
    }

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique key')
    }

    // Calculate expiry date (1 year from now)
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)

    // Insert the new license
    const { data: newLicense, error: insertError } = await supabaseClient
      .from('licenses')
      .insert([
        {
          user_id: user.id,
          key: licenseKey,
          plan: plan,
          status: 'active',
          expires_at: expiryDate.toISOString(),
        },
      ])
      .select()
      .single()

    if (insertError) {
      throw new Error('Failed to create license')
    }

    return new Response(
      JSON.stringify({
        success: true,
        license: newLicense,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})