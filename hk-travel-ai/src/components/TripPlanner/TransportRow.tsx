import React from 'react';
import { FaRoute, FaEdit, FaSave, FaTimes, FaArrowDown } from 'react-icons/fa';
import { Transport } from '@/constants/tripStructure';

interface TransportRowProps {
  transport: Transport;
  dayIndex: number;
  transportIndex: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdateTransport: (field: string, value: string) => void;
}

const TransportRow = ({
  transport,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onUpdateTransport
}: TransportRowProps) => {


  return (
    <tr className="bg-blue-50 border-l-4 border-blue-300">
      <td className="px-4 py-3" colSpan={5}>
        <div className="flex items-center gap-3">
          <FaArrowDown className="text-blue-500 text-sm" />
          <FaRoute className="text-blue-500 text-sm" />
          {isEditing ? (
            <div className="flex gap-2 items-center flex-1">
              <input
                type="text"
                value={transport.method}
                onChange={(e) => onUpdateTransport('method', e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                placeholder="Transport method"
              />
              <input
                type="text"
                value={transport.duration}
                onChange={(e) => onUpdateTransport('duration', e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                placeholder="Duration"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 flex-1">
              <span className="font-medium text-gray-900">{transport.method || 'Transport Method (Edit me)'}</span>
              <span className="text-gray-600 text-sm">{transport.duration || 'Duration (Edit me)'}</span>
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={onSave} className="text-green-600 hover:text-green-800">
                <FaSave />
              </button>
              <button onClick={onCancel} className="text-gray-600 hover:text-gray-800">
                <FaTimes />
              </button>
            </>
          ) : (
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
              <FaEdit />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TransportRow;