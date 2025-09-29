import React from 'react';
import { FaBed, FaPlane, FaArrowDown } from 'react-icons/fa';

interface PlaceholderRowProps {
  type: 'accommodation' | 'arrival' | 'departure';
  text: string;
  dayIndex?: number;
}

const PlaceholderRow = ({ type, text }: PlaceholderRowProps) => {
  const getIcon = () => {
    switch (type) {
      case 'accommodation':
        return <FaBed className="text-purple-500 text-sm" />;
      case 'arrival':
        return <FaPlane className="text-green-500 text-sm" />;
      case 'departure':
        return <FaPlane className="text-red-500 text-sm" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'accommodation':
        return 'bg-purple-50 border-l-4 border-purple-300';
      case 'arrival':
        return 'bg-green-50 border-l-4 border-green-300';
      case 'departure':
        return 'bg-red-50 border-l-4 border-red-300';
    }
  };

  return (
    <tr className={getBgColor()}>
      <td className="px-4 py-3" colSpan={5}>
        <div className="flex items-center gap-3">
          <FaArrowDown className="text-gray-400 text-sm" />
          {getIcon()}
          <span className="text-gray-700 italic">{text}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-gray-400 text-sm">Read-only</span>
      </td>
    </tr>
  );
};

export default PlaceholderRow;