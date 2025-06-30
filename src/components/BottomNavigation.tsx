
import React from 'react';
import { Home, Search, Star, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'donor' | 'driver' | 'patient';
}

const BottomNavigation = ({ activeTab, onTabChange, userRole }: BottomNavigationProps) => {
  const getTabs = () => {
    const baseTabs = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'requests', label: 'Requests', icon: Search },
    ];

    if (userRole === 'donor') {
      baseTabs.push({ id: 'rewards', label: 'Rewards', icon: Star });
    }

    return baseTabs;
  };

  const tabs = getTabs();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
