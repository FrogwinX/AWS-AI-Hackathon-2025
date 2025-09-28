import React from 'react';
import { CHATBOT_FEATURES } from '../constants/info';
import { FaBell, FaChartLine, FaExchangeAlt, FaGavel, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const ChatbotFeature = ({ isTravel }: { isTravel: boolean }) => {
  const { travel } = CHATBOT_FEATURES;

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'gavel':
        return <FaGavel className="text-xl" />;
      case 'bell':
        return <FaBell className="text-xl" />;
      case 'exchangeAlt':
        return <FaExchangeAlt className="text-xl" />;
      case 'chartLine':
        return <FaChartLine className="text-xl" />;
      case 'shieldAlt':
        return <FaShieldAlt className="text-xl" />;
      case 'moneyBillWave':
        return <FaMoneyBillWave className="text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full ">
      {travel.map((card, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className={`rounded-lg p-4 sm:p-5 flex-1 border-t-4 border-teal-500 bg-white h-full`}>
            <div className="flex items-center mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center text-teal-500`}>
                {getIcon(card.icon)}
              </div>
              <h3 className={`text-base sm:text-lg font-bold text-teal-500`}>{card.title}</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ChatbotFeature;
