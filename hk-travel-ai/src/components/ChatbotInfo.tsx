import React from 'react';
import { KEY_CAPABILITIES, STATS } from '../constants/info';
import { FaLightbulb, FaChartBar, FaBrain, FaBolt, FaChartLine, FaGlobe } from 'react-icons/fa';

const ChatbotInfo = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return <FaBrain className="text-lg mt-1" />;
      case 'bolt':
        return <FaBolt className="text-lg mt-1" />;
      case 'chart-line':
        return <FaChartLine className="text-lg mt-1" />;
      case 'globe':
        return <FaGlobe className="text-lg mt-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-4 sm:gap-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="flex items-center gap-3 text-blue-900 mb-6 sm:mb-4">
          <FaLightbulb className="text-lg sm:text-xl text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold">Key Capabilities</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {KEY_CAPABILITIES.map((capability, index) => (
            <div key={index} className="flex gap-2 sm:gap-3">
              {getIcon(capability.icon)}
              <div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{capability.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{capability.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white h-full rounded-xl shadow-md p-4 sm:p-6">
        <div className="flex items-center gap-3 text-blue-900 mb-3 sm:mb-4">
          <FaChartBar className="text-lg sm:text-xl text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold">Performance Impact</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {STATS.map((stat, index) => (
            <div key={index} className="bg-gray-50 border border-blue-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotInfo;
