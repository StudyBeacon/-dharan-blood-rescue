
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Volume2, Keyboard, MousePointer, Palette, Type } from 'lucide-react';

const AccessibilityFeatures = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceAnnouncements: false,
    fontSize: 'medium',
    colorScheme: 'default'
  });

  useEffect(() => {
    // Load saved accessibility settings
    const saved = localStorage.getItem('bloodconnect_accessibility');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Apply accessibility settings to document
    applyAccessibilitySettings();
    
    // Save settings
    localStorage.setItem('bloodconnect_accessibility', JSON.stringify(settings));
  }, [settings]);

  const applyAccessibilitySettings = () => {
    const root = document.documentElement;

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Font size
    root.style.setProperty('--base-font-size', getFontSize(settings.fontSize));

    // Color scheme
    root.setAttribute('data-color-scheme', settings.colorScheme);
  };

  const getFontSize = (size: string) => {
    switch (size) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      case 'xlarge': return '20px';
      default: return '16px';
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const announceToScreenReader = (message: string) => {
    if (settings.voiceAnnouncements && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      voiceAnnouncements: false,
      fontSize: 'medium',
      colorScheme: 'default'
    };
    setSettings(defaultSettings);
    announceToScreenReader('Accessibility settings reset to defaults');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-blue-600" />
            <span>Accessibility Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Visual Settings</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="flex items-center space-x-2">
                  <span>High Contrast Mode</span>
                </Label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="large-text" className="flex items-center space-x-2">
                  <span>Large Text</span>
                </Label>
                <Switch
                  id="large-text"
                  checked={settings.largeText}
                  onCheckedChange={(checked) => updateSetting('largeText', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="flex items-center space-x-2">
                  <span>Reduce Motion</span>
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xlarge">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Navigation Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <Keyboard className="h-4 w-4" />
              <span>Navigation Settings</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="keyboard-nav" className="flex items-center space-x-2">
                  <span>Enhanced Keyboard Navigation</span>
                </Label>
                <Switch
                  id="keyboard-nav"
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="flex items-center space-x-2">
                  <span>Screen Reader Support</span>
                </Label>
                <Switch
                  id="screen-reader"
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                />
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <span>Audio Settings</span>
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-announcements" className="flex items-center space-x-2">
                <span>Voice Announcements</span>
              </Label>
              <Switch
                id="voice-announcements"
                checked={settings.voiceAnnouncements}
                onCheckedChange={(checked) => updateSetting('voiceAnnouncements', checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button onClick={resetToDefaults} variant="outline">
              Reset to Defaults
            </Button>
            <Button onClick={() => announceToScreenReader('Accessibility settings saved successfully')}>
              Test Voice Announcement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Keyboard className="h-5 w-5 text-green-600" />
            <span>Keyboard Shortcuts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Navigate to Dashboard</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + D</kbd>
              </div>
              <div className="flex justify-between">
                <span>Search Donors</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Request Blood</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + B</kbd>
              </div>
              <div className="flex justify-between">
                <span>Request Ambulance</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + A</kbd>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Open Profile</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + P</kbd>
              </div>
              <div className="flex justify-between">
                <span>View Notifications</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle Dark Mode</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + T</kbd>
              </div>
              <div className="flex justify-between">
                <span>Help & Support</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Alt + H</kbd>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityFeatures;
