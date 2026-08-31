import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PostSheet from './components/PostSheet';
import HomeContainer from './containers/HomeContainer';
import ExploreContainer from './containers/ExploreContainer';
import ChatContainer from './containers/ChatContainer';
import ProfileContainer from './containers/ProfileContainer';
import { chatThreads } from './data/mockData';

type TabIndex = 0 | 1 | 2 | 3;

const tabComponents = [HomeContainer, ExploreContainer, ChatContainer, ProfileContainer];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabIndex>(0);
  const [direction, setDirection] = useState(0);
  const [postSheetOpen, setPostSheetOpen] = useState(false);

  const totalUnread = chatThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  const handleTabChange = useCallback((index: number) => {
    if (index === activeTab) return;
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index as TabIndex);
  }, [activeTab]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const CurrentTab = tabComponents[activeTab];

  return (
    <div className="h-screen w-screen bg-[#F8F6F3] flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Fixed Header */}
      <Header />

      {/* Swappable Central Container */}
      <main className="flex-1 overflow-hidden mt-16 mb-[72px] relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className="h-full w-full absolute inset-0"
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -30, scale: 0.98 }}
            transition={{
              opacity: { duration: 0.15 },
              x: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
              scale: { duration: 0.2, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] },
            }}
          >
            <CurrentTab />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Post Sheet Overlay */}
      <PostSheet isOpen={postSheetOpen} onClose={() => setPostSheetOpen(false)} />

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        unreadCount={totalUnread}
        trustScore={87}
        onPostClick={() => setPostSheetOpen(true)}
      />
    </div>
  );
}
