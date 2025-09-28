import React from 'react';
import { SOLUTIONS } from '../constants/info';
import Chatbot from './Chatbot';
import ChatbotInfo from './ChatbotInfo';
import { TravelGuideProps, TRAVEL_GUIDES } from '@/constants/travel';

const RetailChatPanel = ({ isActive, chatId, selectedGuide } : { isActive: boolean, chatId: string, selectedGuide: TravelGuideProps}) => {
  const guideInfo = TRAVEL_GUIDES(selectedGuide).guide;
  const { travelChatbot } = SOLUTIONS(selectedGuide);
  return (
    <div className='flex flex-col lg:flex-row justify-between w-full h-full gap-6'>
      <div className={`flex flex-col bg-white w-full h-[95vh] sm:h-[95vh] rounded-xl shadow-lg overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
        <div className="bg-teal-400 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="text-base sm:text-lg font-bold">{travelChatbot.title}</div>
        </div>
        <Chatbot from={`${guideInfo.initial} Travel`} chatId={chatId} selectedGuide={selectedGuide}/>
      </div>
      <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 ${isActive ? 'flex' : 'hidden'} flex-col h-full`}>
        <ChatbotInfo />
      </div>
    </div>
  );
};

export default RetailChatPanel;
