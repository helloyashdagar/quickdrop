import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Pill, KeyRound, Smartphone, Gift, PenLine, Shield, Zap, AlertTriangle, Watch, ChevronRight } from 'lucide-react';
import { categories } from '../data/mockData';

interface PostSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  Documents: FileText,
  Medicine: Pill,
  Keys: KeyRound,
  Gadgets: Smartphone,
  Gifts: Gift,
  Other: PenLine,
};

const collateralSuggestions: Record<string, string> = {
  Documents: 'Your Smartwatch',
  Medicine: 'Your Noise Headphones',
  Keys: 'Your Sunglasses',
  Gadgets: 'Your Tablet',
  Gifts: 'Your Wallet',
  Other: 'A Valuable Item',
};

export default function PostSheet({ isOpen, onClose }: PostSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [otherText, setOtherText] = useState('');
  const [isFragile, setIsFragile] = useState<boolean | null>(null);
  const [urgency, setUrgency] = useState<'standard' | 'high' | 'emergency'>('standard');
  const [showCollateral, setShowCollateral] = useState(false);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setShowCollateral(true);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setOtherText('');
    setIsFragile(null);
    setUrgency('standard');
    setShowCollateral(false);
    onClose();
  };

  const isEmergency = urgency === 'emergency';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed left-0 right-0 bottom-0 z-[70] bg-white rounded-t-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: '60vh', top: 'auto' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[#E5E2DE]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <h2 className={`text-lg font-bold ${isEmergency ? 'text-[#FF3B3B]' : 'text-[#1A1A2E]'}`}>
                  What do you need to move?
                </h2>
                <p className="text-xs text-[#9A9A9E] mt-0.5">
                  Choose a category so travelers know what to expect.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-[#F0EDE9] flex items-center justify-center hover:bg-[#E5E2DE] transition-colors"
              >
                <X className="w-4 h-4 text-[#5A5A6E]" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: 'calc(60vh - 80px)' }}>
              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-none">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat] || FileText;
                  const isSelected = selectedCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20'
                          : 'bg-[#F0EDE9] text-[#1A1A2E] hover:bg-[#E5E2DE]'
                      } ${isEmergency && isSelected ? 'bg-[#FF3B3B] shadow-[#FF3B3B]/20' : ''}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat}
                    </motion.button>
                  );
                })}
              </div>

              {/* Other text input */}
              <AnimatePresence>
                {selectedCategory === 'Other' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value.slice(0, 60))}
                        placeholder="Describe your item (e.g., Blue Lenovo Laptop, or Wedding Ring)"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F6F3] border border-[#E5E2DE] text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all"
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] text-[#9A9A9E] font-mono">{otherText.length}/60</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secondary Chips */}
              <AnimatePresence>
                {selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {/* Fragile */}
                    <div>
                      <label className="text-xs font-semibold text-[#5A5A6E] uppercase tracking-wider mb-2 block">
                        Is this Fragile?
                      </label>
                      <div className="flex gap-2">
                        {([true, false] as const).map((val) => (
                          <button
                            key={val.toString()}
                            onClick={() => setIsFragile(val)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              isFragile === val
                                ? 'bg-[#1A2A3A] text-white'
                                : 'bg-[#F0EDE9] text-[#5A5A6E] hover:bg-[#E5E2DE]'
                            }`}
                          >
                            {val ? 'Yes' : 'No'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="text-xs font-semibold text-[#5A5A6E] uppercase tracking-wider mb-2 block">
                        Urgency Level
                      </label>
                      <div className="flex gap-2">
                        {(['standard', 'high', 'emergency'] as const).map((u) => (
                          <button
                            key={u}
                            onClick={() => setUrgency(u)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                              urgency === u
                                ? u === 'emergency'
                                  ? 'bg-[#FF3B3B] text-white'
                                  : u === 'high'
                                    ? 'bg-[#FF6B35] text-white'
                                    : 'bg-[#1A2A3A] text-white'
                                : 'bg-[#F0EDE9] text-[#5A5A6E] hover:bg-[#E5E2DE]'
                            }`}
                          >
                            {u === 'emergency' && <AlertTriangle className="w-3.5 h-3.5" />}
                            {u === 'high' && <Zap className="w-3.5 h-3.5" />}
                            {u === 'standard' && <Shield className="w-3.5 h-3.5" />}
                            {u.charAt(0).toUpperCase() + u.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Banner */}
                    <AnimatePresence>
                      {isEmergency && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-[#FFEBEB] border border-[#FF3B3B]/20 rounded-xl p-3 flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-[#FF3B3B] shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-[#FF3B3B]">Emergency Mode Active</p>
                              <p className="text-xs text-[#FF3B3B]/70">Your reward is boosted 2x. Travelers are notified immediately.</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Collateral Suggestion */}
                    <AnimatePresence>
                      {showCollateral && selectedCategory && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-[#F0EDE9] rounded-xl p-3.5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] flex items-center justify-center shrink-0">
                              <Watch className="w-5 h-5 text-[#FF6B35]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#5A5A6E] leading-relaxed">
                                Travelers trust you more if you deposit something of similar value.
                              </p>
                              <p className="text-sm font-semibold text-[#1A1A2E] mt-0.5">
                                Suggest depositing: <span className="text-[#FF6B35]">{collateralSuggestions[selectedCategory]}</span>
                              </p>
                            </div>
                            <button className="flex items-center gap-1 text-xs font-semibold text-[#FF6B35] shrink-0 whitespace-nowrap">
                              Select <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      className={`w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 ${
                        isEmergency ? 'bg-[#FF3B3B] shadow-lg shadow-[#FF3B3B]/20' : 'bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/20'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-4 h-4" />
                      Post Relay Request
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
