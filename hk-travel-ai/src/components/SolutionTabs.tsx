import { BankProps, BANKS } from '@/constants/bank';
import React, { useRef, useEffect } from 'react';

const SolutionTabs = (
  { activeTab, setActiveTab, selectedBank } : 
  { activeTab: string, setActiveTab: (tab: string) => void, selectedBank: BankProps }) => {
  const bankInfo = BANKS(selectedBank).bank;
  const tabRefs = {
    'retail-chat': useRef<HTMLButtonElement>(null),
    'wealth-chat': useRef<HTMLButtonElement>(null),
    'hardware-solution': useRef<HTMLButtonElement>(null),
    'security-solution': useRef<HTMLButtonElement>(null),
    'product-logic': useRef<HTMLButtonElement>(null),
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
          width: tabRefs['retail-chat'].current?.offsetWidth || '100px',
        }}
      />

      <button
        ref={tabRefs['product-logic']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'product-logic'
            ? 'text-blue-400'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('product-logic')}
      >
        Product Logic
      </button>

      <button
        ref={tabRefs['retail-chat']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'retail-chat'
            ? 'text-teal-400'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('retail-chat')}
      >
        {bankInfo.initial} Retail AI
      </button>

      <button
        ref={tabRefs['wealth-chat']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'wealth-chat'
            ? 'text-teal-700'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('wealth-chat')}
      >
        {bankInfo.initial} Wealth AI
      </button>

      <button
        ref={tabRefs['hardware-solution']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'hardware-solution'
            ? 'text-purple-600'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('hardware-solution')}
      >
        Hardware Solutions
      </button>

      <button
        ref={tabRefs['security-solution']}
        className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 cursor-pointer font-medium whitespace-nowrap ${activeTab === 'security-solution'
            ? 'text-blue-800'
            : 'text-gray-500 hover:text-gray-800'
          } transition-colors duration-200 text-xs sm:text-sm md:text-base`}
        onClick={() => setActiveTab('security-solution')}
      >
        Security Services
      </button>
    </div>
  );
};

export default SolutionTabs;
