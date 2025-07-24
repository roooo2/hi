import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Headphones, 
  Smartphone, 
  Check, 
  Download,
  Star,
  Users,
  Key,
  Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Integration',
      description: 'Military-grade encryption ensures your license keys are always protected'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate and validate keys in milliseconds with our optimized infrastructure'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Works seamlessly across iOS, Android, and web applications'
    }
  ]

  const screenshots = [
    {
      title: 'Dashboard Overview',
      description: 'Monitor your license usage and statistics'
    },
    {
      title: 'Key Management',
      description: 'Generate and manage your license keys'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track key usage and performance metrics'
    }
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '10 license keys',
        '1 package',
        'UDID server access',
        'Basic support',
        'Community access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        '100 license keys',
        '3 packages',
        '3 key prefixes',
        'iOS framework',
        'UDID server access',
        'Priority support',
        'Advanced analytics'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: 'Contact',
      period: 'us',
      description: 'Enterprise-grade solution',
      features: [
        'Unlimited license keys',
        'Unlimited packages',
        'Custom key prefixes',
        'White-label solution',
        '24/7 phone support',
        'Custom integrations',
        'SLA guarantee'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">EstebanDash</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#download" className="text-gray-300 hover:text-white transition-colors">Download</a>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EstebanDash
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate platform for managing mobile app license keys with enterprise-grade security and lightning-fast performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download iOS
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download Android
              </motion.button>
            </div>
          </motion.div>

          {/* Device Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-sm mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-3xl shadow-2xl">
              <div className="bg-black rounded-2xl p-6 aspect-[9/19.5]">
                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl h-full p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Key className="w-6 h-6 text-blue-400" />
                      <span className="text-white font-semibold">EstebanDash</span>
                    </div>
                    <div className="text-white text-sm">4:39</div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="bg-blue-600 rounded-lg p-3">
                      <div className="text-white text-sm">Total Keys</div>
                      <div className="text-white text-2xl font-bold">47</div>
                    </div>
                    <div className="bg-purple-600 rounded-lg p-3">
                      <div className="text-white text-sm">Active Devices</div>
                      <div className="text-white text-2xl font-bold">23</div>
                    </div>
                    <div className="bg-green-600 rounded-lg p-3">
                      <div className="text-white text-sm">Success Rate</div>
                      <div className="text-white text-2xl font-bold">98%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage license keys at scale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Beautiful interfaces designed for productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-xl"
              >
                <div className="bg-black rounded-lg aspect-[9/16] mb-4 flex items-center justify-center">
                  <Smartphone className="w-16 h-16 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{screenshot.title}</h3>
                <p className="text-gray-300 text-sm">{screenshot.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Scale with confidence. Upgrade or downgrade at any time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border transition-all ${
                  plan.popular 
                    ? 'border-blue-400 shadow-2xl shadow-blue-400/20' 
                    : 'border-white/10 hover:border-blue-400/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {plan.name === 'Premium' ? 'Contact Sales' : 'Get Started'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download EstebanDash now and start managing your license keys like a pro
            </p>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">System Requirements</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">iOS</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• iOS 14.0 or later</li>
                    <li>• iPhone 8 or newer</li>
                    <li>• 50MB available storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">Android</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Android 8.0 (API 26)</li>
                    <li>• 2GB RAM minimum</li>
                    <li>• 50MB available storage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download for iOS
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download for Android
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Key className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">EstebanDash</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EstebanDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage