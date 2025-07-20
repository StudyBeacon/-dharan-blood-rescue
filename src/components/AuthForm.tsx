// src/components/AuthForm.tsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HealthcareLogo from '@/components/HealthcareLogo';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import api from '@/api/api';
import { AuthContext } from '../context/AuthContext';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'donor' as 'donor' | 'driver' | 'patient',
    rememberMe: false
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'donor' as 'donor' | 'driver' | 'patient',
    bloodGroup: '',
    age: '',
    licenseNumber: '',
    vehicleType: '' as 'car' | 'van' | 'ambulance',
    vehicleRegistration: ''
  });

  useEffect(() => {
    const remembered = localStorage.getItem('bloodconnect_remember_email');
    if (remembered) {
      setLoginData(prev => ({
        ...prev,
        email: remembered,
        rememberMe: true
      }));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', loginData);
      localStorage.setItem('jwtToken', data.accessToken);
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      setUser(data.user);
      navigate(`/dashboard/${data.user.role}`);
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const {
      name,
      email,
      phone,
      password,
      role,
      bloodGroup,
      age,
      licenseNumber,
      vehicleType,
      vehicleRegistration
    } = signupData;

    // Base payload
    const payload: any = { name, email, phone, password, role };

    if (role === 'donor') {
      payload.bloodGroup = bloodGroup;
      payload.age = Number(age);
      payload.location = { type: 'Point', coordinates: [85.324, 27.7172] };
    }

    if (role === 'patient') {
      payload.bloodGroup = bloodGroup;
      payload.age = Number(age);
    }

    if (role === 'driver') {
      payload.licenseNumber = licenseNumber;
      payload.vehicle = { type: vehicleType, registration: vehicleRegistration };
      payload.currentLocation = { type: 'Point', coordinates: [85.324, 27.7172] };
    }

    try {
      const { data } = await api.post('/auth/register', payload);
      localStorage.setItem('jwtToken', data.accessToken);
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      setUser(data.user);
      navigate(`/dashboard/${data.user.role}`);
    } catch (err: any) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HealthcareLogo size={64} />
          <h1 className="text-2xl font-bold text-gray-900">BloodConnect</h1>
          <p className="text-gray-600">Emergency Blood & Ambulance System</p>
          <p className="text-sm text-gray-500">Dharan, Nepal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Join our life-saving community</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm
                  loginData={loginData}
                  setLoginData={setLoginData}
                  onSubmit={handleLogin}
                  onForgotPassword={() => setShowForgotPassword(true)}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm
                  signupData={signupData}
                  setSignupData={setSignupData}
                  onSubmit={handleSignup}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </div>
  );
};

export default AuthForm;