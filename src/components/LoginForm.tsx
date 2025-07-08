import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, User, Lock } from 'lucide-react';

interface LoginFormProps {
  loginData: {
    email: string;
    password: string;
    role: 'donor' | 'driver' | 'patient';
    rememberMe: boolean;
  };
  setLoginData: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
    role: 'donor' | 'driver' | 'patient';
    rememberMe: boolean;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm = ({ 
  loginData, 
  setLoginData, 
  onSubmit, 
  onForgotPassword, 
  isLoading 
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-role">Role</Label>
        <Select value={loginData.role} onValueChange={(value: 'donor' | 'driver' | 'patient') => setLoginData({...loginData, role: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="donor">Blood Donor</SelectItem>
            <SelectItem value="driver">Ambulance Driver</SelectItem>
            <SelectItem value="patient">Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 py-1 sm:py-2">
        <Checkbox
          id="remember-me"
          checked={loginData.rememberMe}
          onCheckedChange={(checked) => 
            setLoginData({...loginData, rememberMe: checked as boolean})
          }
          className="h-3 w-1 sm:h-4 sm:w-4"
        />
        <Label 
          htmlFor="remember-me" 
          className="text-xs sm:text-sm font-normal cursor-pointer select-none flex-1"
        >
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-10 sm:h-12 text-sm sm:text-base" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
