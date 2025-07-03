import React from 'react';
import { Home, Search, Star, User, Users, HelpCircle, Bell } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'donor' | 'driver' | 'patient';
}

const BottomNavigation = ({ activeTab, onTabChange, userRole }: BottomNavigationProps) => {
  const getTabs = () => {
    const baseTabs = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'directory', label: 'Donors', icon: Users },
      { id: 'search', label: 'Search', icon: Search },
    ];

    if (userRole === 'donor') {
      baseTabs.push({ id: 'rewards', label: 'Rewards', icon: Star });
    }

    baseTabs.push(
      { id: 'notifications', label: 'Alerts', icon: Bell },
      { id: 'help', label: 'Help', icon: HelpCircle }
    );

    return baseTabs;
  };

  const tabs = getTabs();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 md:hidden z-40 transition-colors duration-300">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-0 ${
                isActive 
                  ? 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400 scale-105' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950'
              }`}
              aria-label={tab.label}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs font-medium truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
