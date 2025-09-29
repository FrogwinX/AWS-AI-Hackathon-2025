import React from 'react';
import { SOLUTIONS } from '../constants/info';
import { FaBan, FaClipboardCheck, FaUserLock, FaFileContract, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { TravelGuideProps, TRAVEL_GUIDES } from '@/constants/travel';

const LogicPanel = ({ isActive, selectedGuide } : { isActive: boolean, selectedGuide: TravelGuideProps }) => {
  const guideInfo = TRAVEL_GUIDES(selectedGuide).guide;
  const { logic } = SOLUTIONS(selectedGuide);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'ban':
      case 'map-marked-alt':
        return <FaBan className="text-xl" />;
      case 'clipboard-check':
      case 'clock':
        return <FaClipboardCheck className="text-xl" />;
      case 'user-lock':
      case 'language':
        return <FaUserLock className="text-xl" />;
      case 'file-contract':
      case 'mobile-alt':
        return <FaFileContract className="text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex-3 bg-white h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
      <div className="bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-base sm:text-lg font-bold">{logic.title}</div>
        {/* <div className="flex flex-wrap gap-2 hidden md:flex">
          {logic.capabilities.map((capability, index) => (
            <div key={index} className="bg-gray-500 px-2 sm:px-3 py-1 rounded-full text-xs">
              {capability}
            </div>
          ))}
        </div> */}
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 sm:gap-6">
            {/* Architecture Card */}
            <div className="bg-gray-50 border border-blue-50 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">{logic.cards[0].title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6">{logic.cards[0].content}</p>
              <div className="space-y-6">
                {logic.cards[0].architectureStep?.map((step) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className={`bg-gray-50 rounded-lg p-4 sm:p-5 flex-1 border-l-4 border-blue-600 bg-gray-100`}>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800">{step.number}. {step.title}</h3>
                      <p className="text-gray-600 mt-2 text-sm sm:text-base">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Card */}
            <div className="bg-gray-50 border border-blue-50 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">{logic.cards[1].title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {logic.cards[1].complianceSafeguards?.map((safeguard, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-5 border-l-4 border-blue-600 bg-gray-100">
                    <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <div className="text-blue-600">
                        {getIcon(safeguard.icon)}
                      </div>
                      {safeguard.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">{safeguard.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="flex-1 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="bg-gray-50 border border-blue-50 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">{logic.features.title}</h3>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logic.features.items.map((item, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCheckCircle className="text-green-600" />
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">{item.feature}</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm ml-6">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicPanel;