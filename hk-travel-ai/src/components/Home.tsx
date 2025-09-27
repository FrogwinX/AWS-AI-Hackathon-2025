'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SolutionTabs from '@/components/SolutionTabs';
import RetailChatPanel from '@/components/RetailChatPanel';
import HardwarePanel from '@/components/HardwarePanel';
import SecurityPanel from '@/components/SecurityPanel';
import Footer from '@/components/Footer';
import TrustedBy from '@/components/TrustedBy';
import LogicPanel from '@/components/LogicPanel';
import WealthChatPanel from '@/components/WealthChatPanel';
import ChatbotFeature from '@/components/ChatbotFeature';
import { BankProps } from '@/constants/bank';

export default function Home({ selectedBank } : { selectedBank: BankProps }) {

  const [activeTab, setActiveTab] = useState('retail-chat');
  const [retailChatId, setRetailChatId] = useState(Date.now().toString());
  const [wealthChatId, setWealthChatId] = useState((Date.now() + 1).toString());

  return (
    <>
      <Header />
      <SolutionTabs activeTab={activeTab} setActiveTab={setActiveTab} selectedBank={selectedBank} />

      <div className="flex-1 px-4 sm:px-8 py-4 mx-auto w-full h-full flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
          <div className="flex-1 flex flex-col h-full">
            <LogicPanel isActive={activeTab === 'product-logic'} selectedBank={selectedBank} />
            <RetailChatPanel isActive={activeTab === 'retail-chat'} chatId={retailChatId} selectedBank={selectedBank} />
            <WealthChatPanel isActive={activeTab === 'wealth-chat'} chatId={wealthChatId} selectedBank={selectedBank} />
            <HardwarePanel isActive={activeTab === 'hardware-solution'} selectedBank={selectedBank} />
            <SecurityPanel isActive={activeTab === 'security-solution'} selectedBank={selectedBank} />
          </div>
        </div>
        {(activeTab === 'retail-chat' || activeTab === 'wealth-chat') &&
          <div className="flex flex-row lg:flex-row gap-4 w-full">
            <ChatbotFeature isRetail={activeTab === 'retail-chat'} />
          </div>
        }
        <div className="flex flex-row lg:flex-row gap-4 w-full">
          <TrustedBy />
        </div>
      </div>

      <Footer />
    </>
  );
}
