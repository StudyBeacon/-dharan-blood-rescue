
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HealthcareLogo from '@/components/HealthcareLogo';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

interface AuthFormProps {
  onLogin: (role: 'donor' | 'driver' | 'patient', userData: any) => void;
  currentLanguage?: 'en' | 'ne';
}

const AuthForm = ({ onLogin, currentLanguage = 'en' }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
    bloodGroup: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Store remember me preference
    if (loginData.rememberMe) {
      localStorage.setItem('bloodconnect_remember_email', loginData.email);
    } else {
      localStorage.removeItem('bloodconnect_remember_email');
    }
    
    // Simulate API call
    setTimeout(() => {
      onLogin(loginData.role, {
        name: loginData.email.split('@')[0],
        email: loginData.email,
        role: loginData.role
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(signupData.role, {
        name: signupData.name,
        email: signupData.email,
        role: signupData.role,
        bloodGroup: signupData.bloodGroup
      });
      setIsLoading(false);
    }, 1000);
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('bloodconnect_remember_email');
    if (rememberedEmail) {
      setLoginData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <HealthcareLogo size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">BloodConnect</h1>
          <p className="text-gray-600">Emergency Blood & Ambulance System</p>
          <p className="text-sm text-gray-500">Dharan, Nepal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Join our life-saving community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
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
