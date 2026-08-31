import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Flame, ArrowRight, Package, TrendingUp, CheckCircle, Send, MapPinned, User } from 'lucide-react';
import { activeRelays, travelers, activities } from '../data/mockData';

export default function HomeContainer() {
  const [streakCount] = useState(7);
  const [matchPulse, setMatchPulse] = useState(false);

  const handleMatch = () => {
    setMatchPulse(true);
    setTimeout(() => setMatchPulse(false), 600);
  };

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    awaiting: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Awaiting Pickup' },
    'in-transit': { bg: 'bg-blue-50', text: 'text-blue-600', label: 'In Transit' },
    'at-relay': { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'At Relay Point' },
    delivered: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Delivered' },
  };

  const activityIcons: Record<string, React.ElementType> = {
    matched: TrendingUp,
    sent: Send,
    received: Package,
    completed: CheckCircle,
  };

  const activityColors: Record<string, { bg: string; text: string }> = {
    matched: { bg: 'bg-[#FF6B35]/10', text: 'text-[#FF6B35]' },
    sent: { bg: 'bg-blue-50', text: 'text-blue-600' },
    received: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    completed: { bg: 'bg-gray-50', text: 'text-gray-600' },
  };

  return (
    <div className={`h-full overflow-y-auto px-4 py-4 pb-6 space-y-6 ${matchPulse ? 'flash-orange' : ''}`}>
      {/* Trust Streak Banner */}
      <motion.div
        className="flex items-center gap-3 bg-[#1A2A3A] rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Flame className="w-8 h-8 text-[#FF6B35]" />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B35] text-white text-[9px] font-bold flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {streakCount}
          </motion.div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Trust Streak</p>
          <p className="text-xs text-white/60">{streakCount} days of active relay use. +5% bonus on all relays!</p>
        </div>
        <ArrowRight className="w-4 h-4 text-white/40" />
      </motion.div>

      {/* Active Relays Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#1A1A2E]">Your Active Relays</h2>
          <span className="text-xs text-[#9A9A9E] font-mono">{activeRelays.length} active</span>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-1 px-1 pb-2 snap-x">
          {activeRelays.map((relay, i) => {
            const status = statusColors[relay.status];
            return (
              <motion.div
                key={relay.id}
                className="min-w-[280px] bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE] snap-start"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>
                      {status.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#9A9A9E]">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono text-[10px]">{relay.eta}</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#1A1A2E] mb-1">{relay.itemName}</p>
                <p className="text-xs text-[#9A9A9E] mb-3">{relay.itemCategory}</p>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-[#F0EDE9] overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full bg-[#FF6B35]"
                    initial={{ width: 0 }}
                    animate={{ width: `${relay.progress}%` }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 1, ease: 'easeOut' }}
                  />
                </div>

                {/* Traveler info */}
                <div className="flex items-center gap-2">
                  <img src={relay.traveler.avatar} alt={relay.traveler.name} className="w-7 h-7 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1A1A2E] truncate">{relay.traveler.name}</p>
                    <p className="text-[10px] text-[#9A9A9E]">To {relay.traveler.destination}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinned className="w-3 h-3 text-[#FF6B35]" />
                    <span className="text-[10px] font-mono text-[#FF6B35]">Live</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Match */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#1A1A2E]">Quick Match</h2>
          <span className="text-xs text-[#9A9A9E] font-mono">Leaving &lt;30 min</span>
        </div>
        <div className="space-y-3">
          {travelers.map((traveler, i) => (
            <motion.div
              key={traveler.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <img src={traveler.avatar} alt={traveler.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1A1A2E]">{traveler.name}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] font-mono text-amber-500">{traveler.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#9A9A9E] mt-0.5">
                    To <span className="font-medium text-[#5A5A6E]">{traveler.destination}</span>
                    <span className="mx-1">·</span>
                    <span className="font-mono text-[#FF6B35]">{traveler.departureIn} min</span>
                  </p>
                </div>
                <motion.button
                  onClick={handleMatch}
                  className="px-4 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold shadow-sm shadow-[#FF6B35]/20 whitespace-nowrap"
                  whileTap={{ scale: 0.95 }}
                >
                  MATCH NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Match Moment Overlay */}
      <AnimatePresence>
        {matchPulse && (
          <motion.div
            className="fixed inset-x-0 top-24 z-50 flex justify-center px-4"
            initial={{ y: -60, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="bg-[#1A2A3A] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm tracking-wide">TRAVELER FOUND!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#1A1A2E]">Recent Activity</h2>
          <span className="text-xs text-[#9A9A9E]">Last 5</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE] space-y-4">
          {activities.map((activity, i) => {
            const Icon = activityIcons[activity.type] || Package;
            const colors = activityColors[activity.type] || { bg: 'bg-gray-50', text: 'text-gray-600' };
            return (
              <motion.div
                key={activity.id}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E]">{activity.action}</p>
                  <p className="text-xs text-[#9A9A9E] mt-0.5 leading-relaxed">{activity.description}</p>
                </div>
                <span className="text-[10px] font-mono text-[#9A9A9E] shrink-0">{activity.timestamp}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Group Relay Toggle */}
      <motion.div
        className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE] flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-[#FF6B35]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1A1A2E]">Group Relay</p>
          <p className="text-xs text-[#9A9A9E]">Split heavy items across multiple travelers</p>
        </div>
        <div className="w-11 h-6 rounded-full bg-[#F0EDE9] relative cursor-pointer">
          <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
        </div>
      </motion.div>
    </div>
  );
}
