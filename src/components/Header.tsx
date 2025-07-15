
import React, { useState } from 'react';
import { Bell, User, Menu, Globe, LogOut, Settings, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  user: {
    name: string;
    role: 'donor' | 'driver' | 'patient';
    avatar?: string;
  };
  onLogout: () => void;
  onLanguageChange: (lang: 'en' | 'ne') => void;
  currentLanguage: 'en' | 'ne';
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Header = ({ user, onLogout, onLanguageChange, currentLanguage, activeTab, onTabChange }: HeaderProps) => {
  const [notificationCount] = useState(3);

  const desktopTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'directory', label: 'Donor Directory' },
    { id: 'profile', label: 'Profile' },
    { id: 'help', label: 'Help' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">BloodConnect</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dharan Emergency System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {desktopTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange?.(tab.id)}
                className={`transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search - Desktop only */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 min-w-5 h-5 flex items-center justify-center animate-pulse">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                <div className="p-3 border-b dark:border-gray-600">
                  <h3 className="font-semibold dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{notificationCount} new notifications</p>
                </div>
                <div className="p-2">
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="text-sm font-medium dark:text-white">Blood Request - Critical</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">O+ blood needed at Dharan Hospital</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 minutes ago</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm font-medium dark:text-white">Ambulance Request</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Emergency transport needed</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">15 minutes ago</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-sm font-medium dark:text-white">Reward Points Earned</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">+100 points for blood donation</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t dark:border-gray-600">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuItem onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ne' : 'en')}>
                  <Globe className="mr-2 h-4 w-4" />
                  {currentLanguage === 'en' ? 'नेपाली' : 'English'}
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTabChange?.('profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
