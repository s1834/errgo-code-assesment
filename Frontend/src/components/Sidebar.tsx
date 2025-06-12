/**
 * DO NOT EDIT
 */
import React from 'react';
import { Home, Folder, Server, BarChart2, Users, Compass, FileText, Search, MessageSquare, User, ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarProps {
  visible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ visible = true }) => {
  const [menuExpanded, setMenuExpanded] = React.useState(true);

  // If not visible, return null or an empty div to avoid rendering anything
  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 w-64 text-gray-800 shadow-md">
      {/* Create Project Button */}
      <div className="px-1 py-1 bg-purple-500 text-white text-center">
        <button className="flex items-center justify-center w-full">
          <span className="mr-2">+</span>
          <span>Create Project</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-grow overflow-y-auto">
        <ul className="py-1">
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <Home className="h-4 w-4 mr-3" />
            <span>Home</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <Folder className="h-4 w-4 mr-3" />
            <span>Projects</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <Server className="h-4 w-4 mr-3" />
            <span>Deployments</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <BarChart2 className="h-4 w-4 mr-3" />
            <span>Usage</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <Users className="h-4 w-4 mr-3 mb-1" />
            <span>Teams</span>
          </li>
        </ul>

        <div className="px-1 py-1 text-xs text-gray-500">
          <span>Learn more</span>
        </div>

        <ul className="py-1">
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center font-medium">
            <Compass className="h-4 w-4 mr-3 mt-0" />
            <span>Discover Workspace</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <FileText className="h-4 w-4 mr-3" />
            <span>Templates</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <Search className="h-4 w-4 mr-3" />
            <span>Search</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <MessageSquare className="h-4 w-4 mr-3" />
            <span>Messages</span>
          </li>
          <li className="px-1 py-1 hover:bg-purple-200 flex items-center">
            <User className="h-4 w-4 mr-3" />
            <span>Profile</span>
          </li>
        </ul>
      </div>

      {/* Basic Plan Section */}
      <div className="mt-auto">
        <div className="px-1 py-1 border-t border-b border-purple-200">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setMenuExpanded(!menuExpanded)}>
            <span className="font-medium">Basic Plan</span>
            {menuExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </div>
         
          {menuExpanded && (
            <div className="py-1 space-y-1 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Users className="h-4 w-4 mr-2" />
                </div>
                <div>
                  <div>Free workspaces</div>
                  <div className="text-xs text-gray-500">3/3</div>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 mr-2" />
                </div>
                <div>
                  <div>Free Components</div>
                  <div className="text-xs text-gray-500">10/10</div>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 mr-2" />
                </div>
                <div>
                  <div>Free Storage</div>
                  <div className="text-xs text-gray-500">5MB</div>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Server className="h-4 w-4 mr-2" />
                </div>
                <div>
                  <div>Free Deployments</div>
                  <div className="text-xs text-gray-500">1/1</div>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Users className="h-4 w-4 mr-2" />
                </div>
                <div>
                  <div>Free Members</div>
                  <div className="text-xs text-gray-500">2/3</div>
                </div>
              </div>
            </div>
          )}
        </div>
       
        {/* Upgrade Button */}
        <div className="px-1 py-1 bg-purple-500 text-white text-center">
          <button className="w-full">Upgrade to Pro</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;