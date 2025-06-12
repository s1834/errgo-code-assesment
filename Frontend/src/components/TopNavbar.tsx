import React from "react";
import { Search, Bell, MessageCircle, Menu, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

interface TopNavbarProps {
  toggleSidebar?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="h-14 border-b border-blue-300 flex items-center justify-between px-4 bg-gray-100">
      {/* Left section with logo and toggle */}
      <div className="flex items-center">
        <div className="mr-4">
          <div
            className="w-0 h-0
                         border-l-8 border-l-transparent
                         border-r-8 border-r-transparent
                         border-b-16 border-b-purple-600"
          />
        </div>
        <div className="px-4 py-2 border-none border-purple-200 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <NavLink to="/">
            <span className="text-sm">Go Back to Home</span>
          </NavLink>
        </div>
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="p-10 rounded transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl mx-4 bg-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search & run commands"
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-200 border-none focus:ring-1 focus:ring-gray-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Right section with notifications */}
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-700" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <MessageCircle className="h-5 w-5 text-gray-700" />
        </button>
        <div className="ml-2 flex items-center">
          <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-700">
            VA
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
