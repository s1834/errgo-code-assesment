/**
 * DO NOT EDIT
 */
import React, { useState } from 'react';

interface DropdownButtonProps {
  title: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md z-50 hover:bg-gray-400 w-28 h-10"
      >
        {title}
      </button>


      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li>
              <button className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 w-full">
                Option 1
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 w-full">
                Option 2
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 w-full">
                Option 3
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


export default DropdownButton;
