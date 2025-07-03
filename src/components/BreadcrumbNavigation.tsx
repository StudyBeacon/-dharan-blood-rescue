
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbNavigationProps {
  activeTab: string;
  userRole: string;
}

const BreadcrumbNavigation = ({ activeTab, userRole }: BreadcrumbNavigationProps) => {
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', path: 'dashboard', icon: Home }
    ];

    const tabLabels: Record<string, string> = {
      dashboard: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`,
      directory: 'Donor Directory',
      search: 'Advanced Search',
      rewards: 'Rewards System',
      notifications: 'Notifications',
      analytics: 'Smart Analytics',
      map: 'Live Map',
      emergency: 'Emergency System',
      profile: 'Profile Settings',
      help: 'Help & Support',
      settings: 'Production Settings'
    };

    if (activeTab !== 'dashboard') {
      breadcrumbs.push({ label: tabLabels[activeTab] || activeTab, path: activeTab, icon: null });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.path}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="flex items-center space-x-1">
                  {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                  <span>{breadcrumb.label}</span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="flex items-center space-x-1">
                  {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                  <span>{breadcrumb.label}</span>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
