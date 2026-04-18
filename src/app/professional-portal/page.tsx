"use client";

import { useState } from "react";
import { User, MapPin, Upload, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function ProfessionalPortal() {
  const [view, setView] = useState<"login" | "register">("login");
  const [regStep, setRegStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auth Store
  const login = useAuthStore((state) => state.login);
  const [loginData, setLoginData] = useState({ name: "" });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    login({ id: "guide-1", name: loginData.name || "Ahmed R.", email: "ahmed@example.com", role: "GUIDE", isAdmin: false });
    window.location.href = "/dashboard/guide";
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#001F54] mb-4">Professional Portal</h1>
          <p className="text-gray-600">The gateway for Morocco's certified local experts.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel - Information */}
          <div className="bg-[#001F54] text-white p-10 md:w-5/12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#FFD700] rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <ShieldCheck size={48} className="text-[#FFD700] mb-6" />
              <h2 className="text-2xl font-bold mb-4">Eliminate Revenue Leakage</h2>
              <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                GuideLink is designed to put power back into the hands of local communities. By formalizing your services through our Mobile Certification Engine, you ensure that tourism dollars stay local.
              </p>
              
              <div className="space-y-4 text-sm font-medium text-blue-50">
                <div className="flex items-center gap-3"><CheckCircle size={18} className="text-[#FFD700]"/> 0% Commission on direct bookings</div>
                <div className="flex items-center gap-3"><CheckCircle size={18} className="text-[#FFD700]"/> Official digital visibility</div>
                <div className="flex items-center gap-3"><CheckCircle size={18} className="text-[#FFD700]"/> Connect securely with travelers</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Forms */}
          <div className="p-10 md:w-7/12">
            
            {/* Toggle */}
            {!isSubmitted && (
              <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
                <button 
                  onClick={() => setView("login")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === "login" ? "bg-white text-[#001F54] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Guide Login
                </button>
                <button 
                  onClick={() => setView("register")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === "register" ? "bg-white text-[#001F54] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Become a Guide
                </button>
              </div>
            )}

            {/* Login View */}
            {view === "login" && !isSubmitted && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    required type="text" placeholder="Ahmed R."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all"
                    value={loginData.name}
                    onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Certificate Number (MGC)</label>
                  <input 
                    required type="text" placeholder="MGC-XXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all font-mono"
                  />
                </div>
                <button type="submit" className="w-full bg-[#001F54] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md">
                  Access Dashboard
                </button>
              </form>
            )}

            {/* Registration View (3-Step Wizard) */}
            {view === "register" && !isSubmitted && (
              <form onSubmit={regStep === 3 ? handleRegisterSubmit : (e) => { e.preventDefault(); setRegStep(regStep + 1); }}>
                
                {/* Progress Indicators */}
                <div className="flex justify-between mb-8 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                  <div className={`absolute top-1/2 left-0 h-0.5 bg-[#001F54] -z-10 -translate-y-1/2 transition-all duration-300 ${regStep === 1 ? 'w-0' : regStep === 2 ? 'w-1/2' : 'w-full'}`}></div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${regStep >= 1 ? 'bg-[#001F54] border-[#001F54] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>1</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${regStep >= 2 ? 'bg-[#001F54] border-[#001F54] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>2</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${regStep >= 3 ? 'bg-[#001F54] border-[#001F54] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>3</div>
                </div>

                {regStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><User size={20} className="text-[#001F54]"/> Personal Information</h3>
                    <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all" />
                    <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all" />
                    <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all" />
                  </div>
                )}

                {regStep === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><MapPin size={20} className="text-[#001F54]"/> Location & Expertise</h3>
                    <input required type="text" placeholder="City of Operation" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all" />
                    <textarea required placeholder="Short Bio (Tell travelers about yourself)" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all resize-none"></textarea>
                  </div>
                )}

                {regStep === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><Upload size={20} className="text-[#001F54]"/> Photo & Verification</h3>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      <div className="text-sm font-bold text-[#001F54]">Click to upload profile photo</div>
                      <div className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-[#001F54]">
                      <strong>Note:</strong> Upon submission, you will need to present your physical National Guide License for verification via a quick video call to receive your digital <strong>MGC</strong> number.
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  {regStep > 1 && (
                    <button type="button" onClick={() => setRegStep(regStep - 1)} className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <ArrowLeft size={18} /> Back
                    </button>
                  )}
                  <button type="submit" className="flex-1 bg-[#001F54] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md flex justify-center items-center gap-2">
                    {regStep === 3 ? "Submit Application" : <>Continue <ArrowRight size={18}/></>}
                  </button>
                </div>
              </form>
            )}

            {/* Success State */}
            {isSubmitted && (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-600 mb-8">
                  Our team is reviewing your profile. We will email you shortly to schedule the brief license verification call.
                </p>
                <Link href="/" className="px-8 py-3 bg-[#001F54] text-white rounded-xl font-bold hover:bg-blue-900 transition-colors inline-block">
                  Return to Home
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}