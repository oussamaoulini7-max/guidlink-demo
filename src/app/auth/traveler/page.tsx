"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function TravelerAuth() {
  const [view, setView] = useState<"login" | "signup" | "admin">("login");
  const [isSuccess, setIsSuccess] = useState(false);
  const login = useAuthStore((state) => state.login);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "signup") {
      setIsSuccess(true);
      setTimeout(() => setView("login"), 2000);
    } else if (view === "admin") {
      // Mock admin login
      login({ id: "admin-1", name: "System Admin", email: formData.email, role: "ADMIN", isAdmin: true });
      window.location.href = "/dashboard/admin";
    } else {
      // Mock traveler login
      login({ 
        id: "traveler-" + Math.random().toString(36).substr(2, 4), 
        name: formData.name || "Demo Traveler", 
        email: formData.email, 
        role: "TRAVELER", 
        isAdmin: false 
      });
      window.location.href = "/guides";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-4 text-[#001F54]">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#001F54] mb-2">
            {view === "login" ? "Welcome Back" : "Start Your Journey"}
          </h1>
          <p className="text-gray-500">
            {view === "login" ? "Login to manage your circular tourism bookings." : "Join GuideLink to explore authentic Morocco."}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
          
          {/* Toggle */}
          {!isSuccess && (
            <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
              <button 
                onClick={() => setView("login")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === "login" ? "bg-white text-[#001F54] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Login
              </button>
              <button 
                onClick={() => setView("signup")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === "signup" ? "bg-white text-[#001F54] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => setView("admin")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === "admin" ? "bg-white text-[#001F54] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Admin
              </button>
            </div>
          )}

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in">
              <CheckCircle size={20} />
              <span className="text-sm font-bold">Account created! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {view === "signup" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required type="text" placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required type="email" placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required type="password" placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#001F54] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md flex justify-center items-center gap-2">
              {view === "login" ? "Login" : "Create Account"} <ArrowRight size={18}/>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm">
            <span className="text-gray-500">
              {view === "login" ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              onClick={() => setView(view === "login" ? "signup" : "login")}
              className="ml-1 font-bold text-[#001F54] hover:underline"
            >
              {view === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#001F54] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
