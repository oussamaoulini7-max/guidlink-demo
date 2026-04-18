"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Star, Users, Compass, Shield } from "lucide-react";
import DecisionTreeBox from "@/components/DecisionTree/DecisionTreeBox";

export default function Home() {
  const [showDecisionTree, setShowDecisionTree] = useState(false);

  const FEATURED_GUIDES = [
    { id: "1", name: "Ahmed R.", city: "Marrakech", rating: 4.9, price: 50, reviews: 124, img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { id: "2", name: "Fatima Z.", city: "Fes", rating: 4.8, price: 45, reviews: 89, img: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
    { id: "3", name: "Youssef T.", city: "Chefchaouen", rating: 5.0, price: 60, reviews: 210, img: "https://i.pravatar.cc/150?u=a042581f4e29026704c" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[#001F54] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop"
            alt="Morocco Sahara"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Authentic Morocco, <span className="text-[#FFD700]">Guided by Experts</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate travel uncertainty. Connect with certified local guides who protect heritage and empower local communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowDecisionTree(true)}
              className="bg-[#FFD700] text-[#001F54] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
            <Link 
              href="/guides"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Browse All Guides
            </Link>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD700] rounded-full blur-[120px] opacity-10"></div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#001F54] mb-1">500+</div>
              <div className="text-gray-500 text-sm font-medium">Certified Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#001F54] mb-1">20+</div>
              <div className="text-gray-500 text-sm font-medium">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#001F54] mb-1">10k+</div>
              <div className="text-gray-500 text-sm font-medium">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#001F54] mb-1">100%</div>
              <div className="text-gray-500 text-sm font-medium">Local Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F54] mb-4">The Circular Tourism Protocol</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We use a unique matching system to ensure fair distribution of tourism revenue across Morocco.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Compass, title: "Choose Your Vibe", desc: "Select your destination and preferred travel style using our neural engine." },
              { icon: Shield, title: "Get Matched", desc: "Our algorithm connects you with the best-fit certified local guides." },
              { icon: Users, title: "Support Locals", desc: "Your booking directly empowers local communities and protects heritage." },
            ].map((step, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#001F54] shadow-sm mb-6 border border-gray-100">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#001F54] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#001F54] mb-4">Meet Our Top Guides</h2>
              <p className="text-gray-600">Hand-picked experts ready to share their stories with you.</p>
            </div>
            <Link href="/guides" className="hidden md:flex items-center gap-2 text-[#001F54] font-bold hover:gap-3 transition-all">
              View All Guides <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_GUIDES.map((guide) => (
              <div key={guide.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-64">
                  <Image src={guide.img} alt={guide.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-bold text-[#001F54] shadow-sm">
                    <ShieldCheck size={14} className="mr-1 text-green-600" /> Verified
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-900">{guide.name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-[#001F54]">${guide.price}</div>
                      <div className="text-xs text-gray-400">per day</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm gap-1 mb-4">
                    <MapPin size={14} /> {guide.city}
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                    <span className="font-bold text-gray-900">{guide.rating}</span>
                    <span className="text-gray-500 text-sm">({guide.reviews})</span>
                  </div>
                  <Link 
                    href="/guides"
                    className="block w-full text-center py-3 bg-[#001F54] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link href="/guides" className="md:hidden flex items-center justify-center gap-2 text-[#001F54] font-bold mt-12">
            View All Guides <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Decision Tree Modal */}
      {showDecisionTree && (
        <DecisionTreeBox onClose={() => setShowDecisionTree(false)} />
      )}
    </div>
  );
}
