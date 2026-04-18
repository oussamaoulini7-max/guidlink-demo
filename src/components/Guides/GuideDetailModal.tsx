"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon, Users, MapPin, ShieldCheck, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

interface Guide {
  id: string;
  name: string;
  city: string;
  dailyRate: number;
  certificationId: string;
  rating?: number;
  reviews?: number;
  bio?: string;
  img?: string;
}

interface GuideDetailModalProps {
  guide: Guide;
  onClose: () => void;
}

export default function GuideDetailModal({ guide, onClose }: GuideDetailModalProps) {
  const [duration, setDuration] = useState(1);
  const [people, setPeople] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      guide,
      duration,
      numberOfPeople: people,
    });
    onClose();
  };

  const handleBookNow = () => {
    addItem({
      guide,
      duration,
      numberOfPeople: people,
    });
    window.location.href = "/checkout";
  };

  const total = guide.dailyRate * duration * people;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)] flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white text-gray-500 hover:bg-gray-100 rounded-full transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Profile & Bio */}
        <div className="flex-1 p-8 bg-gray-50 border-r border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200">
              <Image src={guide.img || `https://ui-avatars.com/api/?name=${guide.name}`} alt={guide.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#001F54]">{guide.name}</h2>
              <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
                <MapPin size={16} /> {guide.city}, Morocco
              </div>
              <div className="flex items-center text-xs font-bold text-green-600 mt-2">
                <ShieldCheck size={14} className="mr-1" /> Cert: {guide.certificationId}
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2 border-y border-gray-200 py-3">
            <Star size={18} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="font-bold text-gray-900">{guide.rating || 4.9}</span>
            <span className="text-gray-500 text-sm">({guide.reviews || 100} reviews)</span>
          </div>

          <h3 className="font-bold text-gray-900 mb-2">About {guide.name.split(' ')[0]}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {guide.bio || `A passionate local expert in ${guide.city}. I specialize in uncovering hidden gems and sharing authentic cultural stories that you won't find in any guidebook.`}
          </p>
        </div>

        {/* Right Side: Booking Configurator */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <span className="text-gray-500 uppercase tracking-wider text-xs font-bold block mb-1">Daily Rate</span>
              <div className="text-3xl font-extrabold text-[#001F54]">${guide.dailyRate} <span className="text-sm font-normal text-gray-500">/ person</span></div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2 gap-2">
                  <CalendarIcon size={16} className="text-[#001F54]" /> Duration (Days)
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button onClick={() => setDuration(Math.max(1, duration - 1))} className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 font-bold">-</button>
                  <span className="flex-1 text-center font-bold text-lg">{duration}</span>
                  <button onClick={() => setDuration(duration + 1)} className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 font-bold">+</button>
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2 gap-2">
                  <Users size={16} className="text-[#001F54]" /> Number of Guests
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button onClick={() => setPeople(Math.max(1, people - 1))} className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 font-bold">-</button>
                  <span className="flex-1 text-center font-bold text-lg">{people}</span>
                  <button onClick={() => setPeople(people + 1)} className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 font-bold">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-700">Total</span>
              <span className="font-extrabold text-2xl text-[#001F54]">${total}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleAddToCart}
                className="w-full py-3 border-2 border-[#001F54] text-[#001F54] font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBookNow}
                className="w-full py-3 bg-[#FFD700] text-[#001F54] font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
