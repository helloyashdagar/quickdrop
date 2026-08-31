import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Users, Settings, Moon, Globe, ChevronRight, Shield, Package, TrendingUp, Award, Star, Lock, Sun } from 'lucide-react';
import { vaultItems } from '../data/mockData';

export default function ProfileContainer() {
  const [darkMode, setDarkMode] = useState(false);
  const trustScore = 87;
  const totalDeliveries = 142;
  const avgRating = 4.8;
  const collateralValue = 112500;

  const menuItems = [
    { icon: Package, label: 'My Vault', subtitle: `${vaultItems.length} items locked`, color: 'bg-blue-50 text-blue-600' },
    { icon: CreditCard, label: 'Payment History', subtitle: 'View all transactions', color: 'bg-emerald-50 text-emerald-600' },
    { icon: Users, label: 'Refer & Earn', subtitle: 'Invite friends, get ₹100 each', color: 'bg-amber-50 text-amber-600' },
  ];

  const settingsItems = [
    { icon: darkMode ? Sun : Moon, label: 'Dark Mode', isToggle: true, value: darkMode, onToggle: () => setDarkMode(!darkMode) },
    { icon: Globe, label: 'Language', subtitle: 'English (IN)', isToggle: false },
  ];

  return (
    <div className="h-full overflow-y-auto px-4 py-4 pb-6 space-y-5">
      {/* Profile Header */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Avatar with Trust Ring */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1" style={{ background: `conic-gradient(from 0deg, #FF6B35 0deg, #FFD700 ${trustScore * 3.6}deg, #E5E2DE ${trustScore * 3.6}deg, #E5E2DE 360deg)` }}>
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <img src="/avatars/user1.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1A2A3A] border-2 border-white flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#1A1A2E]">Mohammad Irfan</h2>
        <p className="text-xs text-[#9A9A9E] mt-0.5">@irfan_iitb</p>

        {/* Trust Score */}
        <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0EDE9]">
          <Award className="w-4 h-4 text-[#FF6B35]" />
          <span className="text-sm font-bold text-[#1A1A2E]">Trust Score</span>
          <span className="font-mono text-sm font-bold text-[#FF6B35]">{trustScore}%</span>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#E5E2DE] text-center">
          <p className="font-mono text-xl font-bold text-[#1A1A2E]">{totalDeliveries}</p>
          <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-1">Deliveries</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#E5E2DE] text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <p className="font-mono text-xl font-bold text-[#1A1A2E]">{avgRating}</p>
          </div>
          <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-1">Avg Rating</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#E5E2DE] text-center">
          <p className="font-mono text-xl font-bold text-[#1A1A2E]">₹{collateralValue.toLocaleString()}</p>
          <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-1">Locked</p>
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-[#E5E2DE] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F8F6F3] ${i < menuItems.length - 1 ? 'border-b border-[#F0EDE9]' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A2E]">{item.label}</p>
                <p className="text-xs text-[#9A9A9E]">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9A9A9E] shrink-0" />
            </button>
          );
        })}
      </motion.div>

      {/* My Vault Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#1A1A2E]">My Vault</h2>
          <span className="text-xs text-[#9A9A9E] font-mono">{vaultItems.length} items</span>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-1 px-1 pb-2">
          {vaultItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="min-w-[140px] bg-white rounded-2xl p-3 shadow-sm border border-[#E5E2DE]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.08 }}
            >
              <div className="w-full h-20 bg-[#F0EDE9] rounded-xl mb-2 flex items-center justify-center">
                <Package className="w-6 h-6 text-[#9A9A9E]" />
              </div>
              <p className="text-xs font-semibold text-[#1A1A2E] truncate">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-xs text-[#FF6B35]">₹{item.value.toLocaleString()}</span>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'locked' ? 'bg-[#1A2A3A] text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                  <Lock className="w-2.5 h-2.5" />
                  {item.status === 'locked' ? 'Locked' : 'Free'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-[#E5E2DE] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-4 py-3 border-b border-[#F0EDE9]">
          <p className="text-xs font-bold text-[#9A9A9E] uppercase tracking-wider">Settings</p>
        </div>
        {settingsItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < settingsItems.length - 1 ? 'border-b border-[#F0EDE9]' : ''}`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#F0EDE9] flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#5A5A6E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A2E]">{item.label}</p>
                {item.subtitle && <p className="text-xs text-[#9A9A9E]">{item.subtitle}</p>}
              </div>
              {item.isToggle ? (
                <button
                  onClick={item.onToggle}
                  className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? 'bg-[#FF6B35]' : 'bg-[#E5E2DE]'}`}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ left: item.value ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              ) : (
                <ChevronRight className="w-4 h-4 text-[#9A9A9E] shrink-0" />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* App Version */}
      <div className="text-center pb-2">
        <p className="text-[10px] text-[#9A9A9E] font-mono">Trusted Relay v2.4.1</p>
      </div>
    </div>
  );
}
