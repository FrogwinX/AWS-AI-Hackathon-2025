import React from 'react';
import { SOLUTIONS } from '../constants/info';
import Chatbot from './Chatbot';
import ChatbotInfo from './ChatbotInfo';
import { BankProps, BANKS } from '@/constants/bank';

const RetailChatPanel = ({ isActive, chatId, selectedBank } : { isActive: boolean, chatId: string, selectedBank: BankProps}) => {
  const bankInfo = BANKS(selectedBank).bank;
  const { retailChatbot } = SOLUTIONS(selectedBank);
  return (
    <div className='flex flex-col lg:flex-row justify-between w-full h-full gap-6'>
      <div className={`flex flex-col bg-white w-full h-[95vh] sm:h-[95vh] rounded-xl shadow-lg overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
        <div className="bg-teal-400 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="text-base sm:text-lg font-bold">{retailChatbot.title}</div>
        </div>
        <Chatbot from={`${bankInfo.initial} Retail`} chatId={chatId} selectedBank={selectedBank}/>
      </div>
      <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 ${isActive ? 'flex' : 'hidden'} flex-col h-full`}>
        <ChatbotInfo />
      </div>
    </div>
  );
};

export default RetailChatPanel;
