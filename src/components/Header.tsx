import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, MapPin } from 'lucide-react';
import { cities } from '../data/mockData';

export default function Header() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('IIT Jammu');
  const [hasNotification, setHasNotification] = useState(true);

  const selectCity = (city: string) => {
    setCurrentCity(city);
    setLocationOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-[#E5E2DE]">
      <div className="h-full flex items-center justify-between px-4 max-w-[430px] mx-auto relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1A2A3A] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 80 80">
              <path d="M28 24 L28 40 Q28 48 36 48 L44 48 Q52 48 52 40 L52 24" stroke="#FF6B35" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M20 44 L28 36 L40 44 L52 36 L60 44" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="40" cy="40" r="4" fill="#FF6B35" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-[#1A1A2E] tracking-tight">Trusted Relay</span>
            <span className="text-[9px] text-[#9A9A9E] font-medium tracking-wider uppercase">Peer Delivery</span>
          </div>
        </div>

        {/* Center: Location Chip */}
        <div className="relative">
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F0EDE9] hover:bg-[#E5E2DE] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="text-xs font-medium text-[#1A1A2E]">{currentCity}</span>
            <ChevronDown className={`w-3 h-3 text-[#9A9A9E] transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {locationOpen && (
              <>
                <motion.div
                  className="fixed inset-0 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLocationOpen(false)}
                />
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-52 bg-white rounded-xl shadow-xl border border-[#E5E2DE] overflow-hidden"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="px-3 py-2 text-[10px] font-semibold text-[#9A9A9E] uppercase tracking-wider bg-[#F8F6F3]">
                    Recent Locations
                  </div>
                  {cities.map((city, i) => (
                    <button
                      key={city}
                      onClick={() => selectCity(city)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                        city === currentCity ? 'bg-[#FF6B35]/10 text-[#FF6B35] font-medium' : 'text-[#1A1A2E] hover:bg-[#F8F6F3]'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${city === currentCity ? 'text-[#FF6B35]' : 'text-[#9A9A9E]'}`} />
                      {city}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-3">
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EDE9] transition-colors"
            onClick={() => setHasNotification(false)}
          >
            <Bell className="w-[18px] h-[18px] text-[#5A5A6E]" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse-ring" />
            )}
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FF6B35]/20 ring-2 ring-[#FF6B35]/10">
            <img src="/avatars/user1.jpg" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
