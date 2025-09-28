'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SolutionTabs from '@/components/SolutionTabs';
import RetailChatPanel from '@/components/RetailChatPanel';

import LogicPanel from '@/components/LogicPanel';
import ChatbotFeature from '@/components/ChatbotFeature';
import TripPlannerPanel from '@/components/TripPlanner/TripPlannerPanel';
import { TravelGuideProps } from '@/constants/travel';
import { TripPlanProvider } from '@/contexts/TripPlanContext';

export default function Home({ selectedGuide } : { selectedGuide: TravelGuideProps }) {

  const [activeTab, setActiveTab] = useState('travel-chat');
  const [travelChatId, setTravelChatId] = useState(Date.now().toString());

  return (
    <TripPlanProvider>
      <Header />
      <SolutionTabs activeTab={activeTab} setActiveTab={setActiveTab} selectedGuide={selectedGuide} />

      <div className="flex-1 px-4 sm:px-8 py-4 mx-auto w-full h-full flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
          <div className="flex-1 flex flex-col h-full">
            <LogicPanel isActive={activeTab === 'guide-features'} selectedGuide={selectedGuide} />
            <RetailChatPanel isActive={activeTab === 'travel-chat'} chatId={travelChatId} selectedGuide={selectedGuide} />
            <TripPlannerPanel isActive={activeTab === 'trip-planner'} selectedGuide={selectedGuide} />
          </div>
        </div>
        {activeTab === 'travel-chat' &&
          <div className="flex flex-row lg:flex-row gap-4 w-full">
            <ChatbotFeature isTravel={true} />
          </div>
        }

      </div>


    </TripPlanProvider>
  );
}
