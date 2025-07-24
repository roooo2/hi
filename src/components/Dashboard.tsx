import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Key, 
  LogOut, 
  Plus, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff,
  Smartphone,
  Shield,
  Clock,
  TrendingUp,
  Package,
  Users,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface License {
  id: string
  key: string
  plan: string
  status: 'active' | 'expired' | 'banned'
  created_at: string
  expires_at: string | null
}

interface UserProfile {
  id: string
  email: string
  plan: 'free' | 'pro' | 'premium'
}

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [licenses, setLicenses] = useState<License[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const planLimits = {
    free: 10,
    pro: 100,
    premium: Infinity
  }

  useEffect(() => {
    if (user) {
      fetchUserProfile()
      fetchLicenses()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user) return

    let { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      // Create user profile if doesn't exist
      const { data: newProfile } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email!,
            plan: 'free'
          }
        ])
        .select()
        .single()
      
      profile = newProfile
    }

    setUserProfile(profile)
  }

  const fetchLicenses = async () => {
    if (!user) return

    setLoading(true)
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch licenses')
    } else {
      setLicenses(data || [])
    }
    setLoading(false)
  }

  const generateKey = async () => {
    if (!user || !userProfile) return

    const currentCount = licenses.length
    const limit = planLimits[userProfile.plan]

    if (currentCount >= limit) {
      toast.error(`You've reached your plan limit of ${limit} keys`)
      return
    }

    setCreating(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan: userProfile.plan
        })
      })

      if (response.ok) {
        toast.success('License key generated successfully!')
        fetchLicenses()
      } else {
        throw new Error('Failed to generate key')
      }
    } catch (error) {
      toast.error('Failed to generate license key')
    } finally {
      setCreating(false)
    }
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('Key copied to clipboard!')
  }

  const deleteKey = async (id: string) => {
    const { error } = await supabase
      .from('licenses')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete key')
    } else {
      toast.success('Key deleted successfully')
      fetchLicenses()
    }
  }

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'expired': return 'text-red-400 bg-red-400/10'
      case 'banned': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'text-blue-400 bg-blue-400/10'
      case 'pro': return 'text-purple-400 bg-purple-400/10'
      case 'premium': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const statusData = [
    { name: 'Active', value: licenses.filter(l => l.status === 'active').length, color: '#10b981' },
    { name: 'Expired', value: licenses.filter(l => l.status === 'expired').length, color: '#ef4444' },
    { name: 'Banned', value: licenses.filter(l => l.status === 'banned').length, color: '#6b7280' }
  ]

  const planData = [
    { name: 'Free', count: licenses.filter(l => l.plan === 'free').length },
    { name: 'Pro', count: licenses.filter(l => l.plan === 'pro').length },
    { name: 'Premium', count: licenses.filter(l => l.plan === 'premium').length }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-8 h-8 text-blue-400" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Key className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">EstebanDash</h1>
                <p className="text-sm text-gray-300">{userProfile?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanColor(userProfile?.plan || 'free')}`}>
                {userProfile?.plan?.toUpperCase()}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Keys</p>
                <p className="text-3xl font-bold text-white">{licenses.length}</p>
              </div>
              <Key className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Keys</p>
                <p className="text-3xl font-bold text-green-400">{licenses.filter(l => l.status === 'active').length}</p>
              </div>
              <Shield className="w-12 h-12 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Key Limit</p>
                <p className="text-3xl font-bold text-purple-400">
                  {planLimits[userProfile?.plan || 'free'] === Infinity ? '∞' : planLimits[userProfile?.plan || 'free']}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Usage</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {Math.round((licenses.length / planLimits[userProfile?.plan || 'free']) * 100) || 0}%
                </p>
              </div>
              <Package className="w-12 h-12 text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Key Status Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-gray-300">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Keys by Plan</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={planData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Generate Key Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateKey}
            disabled={creating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{creating ? 'Generating...' : 'Generate New Key'}</span>
          </motion.button>
        </motion.div>

        {/* License Keys List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Your License Keys</h2>
            <p className="text-gray-300 mt-2">Manage and monitor your generated keys</p>
          </div>

          <div className="divide-y divide-white/10">
            {licenses.length === 0 ? (
              <div className="p-8 text-center">
                <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Keys Generated</h3>
                <p className="text-gray-500">Generate your first license key to get started</p>
              </div>
            ) : (
              licenses.map((license, index) => (
                <motion.div
                  key={license.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Key className="w-5 h-5 text-blue-400" />
                        <code className="bg-black/30 px-3 py-1 rounded text-sm text-white font-mono">
                          {showKeys[license.id] ? license.key : license.key.substring(0, 16) + '...'}
                        </code>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(license.status)}`}>
                          {license.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlanColor(license.plan)}`}>
                          {license.plan.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Created: {new Date(license.created_at).toLocaleDateString()}
                        </span>
                        {license.expires_at && (
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Expires: {new Date(license.expires_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleKeyVisibility(license.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showKeys[license.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyKey(license.key)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteKey(license.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard