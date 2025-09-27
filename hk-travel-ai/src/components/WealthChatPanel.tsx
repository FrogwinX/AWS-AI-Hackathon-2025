'use client';

import React, { useState } from 'react';
import { SOLUTIONS } from '../constants/info';
import Chatbot from './Chatbot';
import { FaShuffle } from 'react-icons/fa6';
import ReplySystem from './ReplySystem';
import InfoPanel from './ChatbotInfo';
import { BankProps, BANKS } from '@/constants/bank';

const WealthChatPanel = ({ isActive, chatId, selectedBank } : { isActive: boolean, chatId: string, selectedBank: BankProps }) => {
  const bankInfo = BANKS(selectedBank).bank;
  const { wealthChatbot } = SOLUTIONS(selectedBank);
  const [isChatbot, setIsChatbot] = useState<boolean>(false);

  return (
    <div className='flex flex-col lg:flex-row justify-between w-full h-full gap-6'>
      <div className={`flex flex-col bg-white w-full h-[95vh] sm:h-[95vh] rounded-xl shadow-lg overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
        <div className="bg-teal-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-base sm:text-lg font-bold">{wealthChatbot.title}</div>
          <button
            onClick={() => setIsChatbot(!isChatbot)}
            className="flex items-center justify-center gap-2 text-white hover:text-teal-500"
          >
            <FaShuffle className="w-4 h-4 "/> {isChatbot ? "Switch to Reply System" : "Switch to Chatbot"}
          </button>
        </div>
        
        <div className={`flex flex-col overflow-y-auto flex-1 ${isChatbot ? '' : 'hidden'}`}>
          <Chatbot from={`${bankInfo.initial} Wealth`} chatId={chatId} selectedBank={selectedBank} />
        </div>
        <div className={`flex flex-col overflow-y-auto flex-1 ${!isChatbot ? '' : 'hidden'}`}>
          <ReplySystem />
        </div>

      </div>
      <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 ${isActive ? 'flex' : 'hidden'} flex-col h-full`}>
        <InfoPanel />
      </div>
    </div>
  );
};

export default WealthChatPanel;
