import { TravelGuideProps, TRAVEL_GUIDES } from '@/constants/travel';
import React, { useRef, useEffect } from 'react';

const SolutionTabs = (
  { activeTab, setActiveTab, selectedGuide } : 
  { activeTab: string, setActiveTab: (tab: string) => void, selectedGuide: TravelGuideProps }) => {
  const guideInfo = TRAVEL_GUIDES(selectedGuide).guide;
  const tabRefs = {
    'travel-chat': useRef<HTMLButtonElement>(null),
    'trip-planner': useRef<HTMLButtonElement>(null),
    'guide-features': useRef<HTMLButtonElement>(null),
  };
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabRef = tabRefs[activeTab as keyof typeof tabRefs];
    if (activeTabRef.current && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef.current;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="relative flex bg-white border-b border-gray-200 px-2 gap-2 sm:px-4 md:px-8 overflow-x-auto no-scrollbar">
      <div
        ref={indicatorRef}
        className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 ease-out"
        style={{
          transform: 'translateX(8px)',
          width: tabRefs['travel-chat'].current?.offsetWidth || '100px',
        }}
      />

      <button
        ref={tabRefs['guide-features']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'guide-features'
            ? 'text-blue-400'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('guide-features')}
      >
        Guide Features
      </button>

      <button
        ref={tabRefs['travel-chat']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'travel-chat'
            ? 'text-teal-400'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('travel-chat')}
      >
        {guideInfo.initial} Travel Chat
      </button>

      <button
        ref={tabRefs['trip-planner']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'trip-planner'
            ? 'text-indigo-600'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('trip-planner')}
      >
        Trip Planner
      </button>
    </div>
  );
};

export default SolutionTabs;
