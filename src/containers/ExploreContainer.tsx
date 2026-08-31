import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRightLeft, ArrowUpDown, Star, Clock, AlertTriangle, Zap, Shield, X, Package, User, MapPinned, ChevronRight } from 'lucide-react';
import { openRequests } from '../data/mockData';

export default function ExploreContainer() {
  const [fromCity, setFromCity] = useState('IIT Bombay');
  const [toCity, setToCity] = useState('Delhi');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const request = openRequests.find((r) => r.id === selectedRequest);

  const urgencyConfig = {
    standard: { color: 'bg-gray-50 text-gray-600', icon: Shield, label: 'Standard' },
    high: { color: 'bg-amber-50 text-amber-600', icon: Zap, label: 'High' },
    emergency: { color: 'bg-red-50 text-red-600', icon: AlertTriangle, label: 'Emergency' },
  };

  const categoryIcons: Record<string, React.ElementType> = {
    Documents: Package,
    Medicine: Package,
    Keys: Package,
    Gadgets: Package,
    Gifts: Package,
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-4 pb-6 space-y-4">
      {/* Route Inputs */}
      <motion.div
        className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative flex items-center gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 bg-[#F8F6F3] rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-[#1A1A2E] focus:outline-none"
                placeholder="From City"
              />
            </div>
            <div className="flex items-center gap-2 bg-[#F8F6F3] rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#00C9A7] shrink-0" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-[#1A1A2E] focus:outline-none"
                placeholder="To City"
              />
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center shrink-0"
            onClick={() => { const temp = fromCity; setFromCity(toCity); setToCity(temp); }}
          >
            <ArrowUpDown className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Open Requests List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#1A1A2E]">Open Requests</h2>
          <span className="text-xs font-mono text-[#9A9A9E]">{openRequests.length} found</span>
        </div>
        <div className="space-y-3">
          {openRequests.map((req, i) => {
            const urgency = urgencyConfig[req.urgency];
            const UrgencyIcon = urgency.icon;
            return (
              <motion.button
                key={req.id}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE] text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => setSelectedRequest(req.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE9] flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-[#5A5A6E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#1A1A2E] truncate">{req.itemName}</p>
                      <span className="font-mono text-sm font-bold text-[#FF6B35]">₹{req.reward}</span>
                    </div>
                    <p className="text-xs text-[#9A9A9E] mt-0.5">{req.itemCategory}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${urgency.color}`}>
                        <UrgencyIcon className="w-3 h-3" />
                        {urgency.label}
                      </div>
                      <span className="text-[10px] text-[#9A9A9E] font-mono">{req.distance} km away</span>
                      <span className="text-[10px] text-[#9A9A9E]">·</span>
                      <span className="text-[10px] text-[#9A9A9E]">{req.postedAt}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F0EDE9]">
                      <img src={req.sender.avatar} alt={req.sender.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs text-[#5A5A6E]">{req.sender.name}</span>
                      <span className="text-[10px] font-mono text-amber-500">{req.sender.rating}</span>
                      <span className="text-[10px] text-[#9A9A9E]">·</span>
                      <span className="text-xs text-[#9A9A9E]">{req.from} → {req.to}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet for Request Details */}
      <AnimatePresence>
        {request && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
            />
            <motion.div
              className="fixed left-0 right-0 bottom-[72px] z-[70] bg-white rounded-t-3xl shadow-2xl overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#E5E2DE]" />
              </div>

              <div className="px-5 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F0EDE9] flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#5A5A6E]" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#1A1A2E]">{request.itemName}</p>
                      <p className="text-xs text-[#9A9A9E]">{request.itemCategory}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="w-8 h-8 rounded-full bg-[#F0EDE9] flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-[#5A5A6E]" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-[#F8F6F3] rounded-xl p-3 text-center">
                    <p className="font-mono text-lg font-bold text-[#FF6B35]">₹{request.reward}</p>
                    <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-0.5">Reward</p>
                  </div>
                  <div className="flex-1 bg-[#F8F6F3] rounded-xl p-3 text-center">
                    <p className="font-mono text-lg font-bold text-[#1A1A2E]">{request.distance}</p>
                    <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-0.5">Km Away</p>
                  </div>
                  <div className="flex-1 bg-[#F8F6F3] rounded-xl p-3 text-center">
                    <p className="font-mono text-lg font-bold text-[#1A1A2E]">{request.postedAt}</p>
                    <p className="text-[10px] text-[#9A9A9E] uppercase tracking-wider mt-0.5">Posted</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4 p-3 bg-[#F8F6F3] rounded-xl">
                  <img src={request.sender.avatar} alt={request.sender.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1A1A2E]">{request.sender.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-mono text-amber-500">{request.sender.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#5A5A6E]">{request.from} → {request.to}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MapPinned className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-xs text-[#5A5A6E]">{request.distance} km from your current location</span>
                </div>

                <button className="w-full py-3.5 rounded-xl bg-[#FF6B35] text-white text-sm font-bold shadow-lg shadow-[#FF6B35]/20 flex items-center justify-center gap-2">
                  Accept Request
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
