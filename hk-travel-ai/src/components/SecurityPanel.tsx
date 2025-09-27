import React from 'react';
import { SOLUTIONS } from '../constants/info';
import { FaSearch, FaHeadset, FaCheckCircle, FaTimesCircle, FaEye, FaFilter, FaUserShield, FaExclamationTriangle, FaLaptop, FaList } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';
import { BankProps } from '@/constants/bank';

const SecurityPanel = ({ isActive, selectedBank } : { isActive: boolean, selectedBank: BankProps }) => {
  const { security } = SOLUTIONS(selectedBank);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'search':
        return <FaSearch className="text-xl" />;
      case 'headset':
        return <FaHeadset className="text-xl" />;
      case 'tick':
        return (
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
        );
      case 'eye':
        return <FaEye />;
      case 'filter':
        return <FaFilter />;
      case 'shield':
        return <FaUserShield />;
      case 'exclamationTriangle':
        return <FaExclamationTriangle />;
      case 'clipboardList':
        return <FaGears />;
      case 'list':
        return <FaList />;
      case 'laptop':
        return <FaLaptop />
      default:
        return null;
    }
  };

  return (
    <div className={`flex-3 bg-white h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
      <div className="bg-blue-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-base sm:text-lg font-bold">{security.title}</div>
        <div className="flex flex-wrap gap-2 hidden md:flex">
          {security.capabilities.map((capability, index) => (
            <div key={index} className="bg-gray-500 px-2 sm:px-3 py-1 rounded-full text-xs">
              {capability}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-0">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {security.cards.map((card, index) => (
              <div key={index} className="bg-gray-50 border border-blue-50 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                    {getIcon(card.icon)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">{card.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6">{card.content}</p>

                <h4 className="text-sm sm:text-base font-bold mb-3">{card.featureTitle}</h4>
                <div className="flex flex-col gap-2 mb-4">
                  {card.features.map((feature, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="text-green-600 sm:mt-1 mr-1">
                        {getIcon(feature.icon)}
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">{feature.description}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r mb-4">
                  <h4 className="text-green-600 font-bold mb-2">{card.deliverables ? "Deliverables:" : "Subscription Details:"}</h4>
                  {card.deliverables && <p className="mb-2 text-sm sm:text-base text-gray-700">Excel report containing:</p>}
                  <ul className="list-disc pl-5 space-y-1">
                    {card.deliverables?.map((item, i) => (
                      <li key={i} className="text-sm sm:text-base text-gray-700">
                        {item}
                      </li>
                    ))}
                    {card.subscription?.map((item, i) => (
                      <li key={i} className="text-sm sm:text-base text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {card.included && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                        <FaCheckCircle />
                        <span>Included</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {card.included.map((item, i) => (
                          <li key={i} className="text-sm sm:text-base text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                        <FaTimesCircle />
                        <span>Excluded</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {card.excluded.map((item, i) => (
                          <li key={i} className="text-sm sm:text-base text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;