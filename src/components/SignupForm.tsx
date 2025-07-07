
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, User, Lock } from 'lucide-react';

interface SignupFormProps {
  signupData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup: string;
  };
  setSignupData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SignupForm = ({ 
  signupData, 
  setSignupData, 
  onSubmit, 
  isLoading 
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            value={signupData.name}
            onChange={(e) => setSignupData({...signupData, name: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={signupData.email}
            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-phone"
            type="tel"
            placeholder="Enter your phone number"
            className="pl-10"
            value={signupData.phone}
            onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-role">Role</Label>
        <Select value={signupData.role} onValueChange={(value: 'donor' | 'driver' | 'patient') => setSignupData({...signupData, role: value})}>
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

      {signupData.role === 'donor' && (
        <div className="space-y-2">
          <Label htmlFor="blood-group">Blood Group</Label>
          <Select value={signupData.bloodGroup} onValueChange={(value) => setSignupData({...signupData, bloodGroup: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select your blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            className="pl-10"
            value={signupData.password}
            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            className="pl-10"
            value={signupData.confirmPassword}
            onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
