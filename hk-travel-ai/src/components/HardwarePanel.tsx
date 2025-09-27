import React from 'react';
import { SOLUTIONS } from '../constants/info';
import { FaShieldAlt, FaNetworkWired, FaCogs } from 'react-icons/fa';
import { BankProps } from '@/constants/bank';

const HardwarePanel = ({ isActive, selectedBank } : { isActive: boolean, selectedBank: BankProps }) => {
  const { hardware } = SOLUTIONS(selectedBank);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'shield-alt':
        return <FaShieldAlt className="text-xl" />;
      case 'network-wired':
        return <FaNetworkWired className="text-xl" />;
      case 'cogs':
        return <FaCogs className="text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex-3 bg-white h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
      <div className="bg-purple-800 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-base sm:text-lg font-bold">{hardware.title}</div>
        <div className="flex flex-wrap gap-2 hidden md:flex">
          {hardware.capabilities.map((capability, index) => (
            <div key={index} className="bg-gray-500 px-2 sm:px-3 py-1 rounded-full text-xs">
              {capability}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-0">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold mb-2">{hardware.overview.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{hardware.overview.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hardware.cards.map((card, index) => (
              <div key={index} className="bg-gray-50 border border-blue-50 rounded-xl p-4 sm:p-6 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                    {getIcon(card.icon)}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{card.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{card.content}</p>
                <div className="flex flex-col gap-2 mt-4">
                  {card.features.map((feature, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="text-green-600 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwarePanel;
