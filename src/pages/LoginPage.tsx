// src/pages/LoginPage.tsx

import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
    role: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Login failed", description: data.message, variant: "destructive" });
        return;
      }

      localStorage.setItem("token", data.token); // optional
      toast({ title: "Login successful!" });

      // Redirect based on role
      switch (data.user.role) {
        case "donor":
          navigate("/donor-dashboard");
          break;
        case "patient":
          navigate("/patient-dashboard");
          break;
        case "driver":
          navigate("/driver-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast({ title: "Login error", description: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
