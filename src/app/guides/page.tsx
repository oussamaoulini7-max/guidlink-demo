"use client";

import { useState } from "react";
import { Filter, Search, MapPin, ShieldCheck, Star, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import GuideDetailModal from "@/components/Guides/GuideDetailModal";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

// Mock data
const ALL_GUIDES = [
  { id: "1", name: "Ahmed R.", city: "Marrakech", rating: 4.9, price: 50, reviews: 124, img: "https://i.pravatar.cc/150?u=a042581f4e29026704d", certificationId: "MGC-1002", languages: ["English", "Arabic"], specialties: ["History", "Architecture"] },
  { id: "2", name: "Fatima Z.", city: "Fes", rating: 4.8, price: 45, reviews: 89, img: "https://i.pravatar.cc/150?u=a042581f4e29026704b", certificationId: "MGC-2034", languages: ["English", "French"], specialties: ["Food", "Culture"] },
  { id: "3", name: "Youssef T.", city: "Chefchaouen", rating: 5.0, price: 60, reviews: 210, img: "https://i.pravatar.cc/150?u=a042581f4e29026704c", certificationId: "MGC-5531", languages: ["Spanish", "Arabic"], specialties: ["Nature", "Photography"] },
  { id: "4", name: "Karim M.", city: "Zagora", rating: 4.7, price: 55, reviews: 67, img: "https://i.pravatar.cc/150?u=a042581f4e29026704a", certificationId: "MGC-1122", languages: ["English", "German"], specialties: ["Desert", "Adventure"] },
  { id: "5", name: "Sara B.", city: "Essaouira", rating: 4.9, price: 40, reviews: 156, img: "https://i.pravatar.cc/150?u=a042581f4e29026704e", certificationId: "MGC-9988", languages: ["English", "French"], specialties: ["Music", "Surfing"] },
];

const LANGUAGES = ["English", "French", "Spanish", "German", "Arabic"];
const SPECIALTIES = ["History", "Food", "Culture", "Nature", "Adventure", "Photography"];

export default function GuideMarketplace() {
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { wishlist, toggleWishlist } = useWishlistStore();

  const handleQuickAdd = (guide: any) => {
    addItem({
      guide: {
        id: guide.id,
        name: guide.name,
        city: guide.city,
        dailyRate: guide.price,
        certificationId: guide.certificationId,
      },
      duration: 1,
      numberOfPeople: 1
    });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#001F54] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Find Your Perfect Guide</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Explore Morocco with certified local experts who know the hidden stories behind every door.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 font-bold text-[#001F54] text-lg border-b pb-4">
              <Filter size={20} /> Filters
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Languages</h3>
              <div className="space-y-2">
                {LANGUAGES.map(lang => (
                  <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001F54] focus:ring-[#001F54]" />
                    <span className="text-gray-600 group-hover:text-[#001F54] transition-colors">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Specialties</h3>
              <div className="space-y-2">
                {SPECIALTIES.map(spec => (
                  <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001F54] focus:ring-[#001F54]" />
                    <span className="text-gray-600 group-hover:text-[#001F54] transition-colors">{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Max Price / Day</h3>
              <input type="range" min="20" max="150" className="w-full accent-[#001F54]" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$20</span>
                <span>$150+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Guide Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-medium">{ALL_GUIDES.length} certified guides found</span>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-[#001F54]">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {ALL_GUIDES.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden flex flex-col group">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6">
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button 
                      onClick={() => toggleWishlist(guide.id)}
                      className={`p-2 rounded-full backdrop-blur-sm shadow-sm transition-all ${wishlist.includes(guide.id) ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-400'}`}
                    >
                      <Heart size={18} fill={wishlist.includes(guide.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-bold text-green-600 shadow-sm">
                      <ShieldCheck size={14} className="mr-1" /> Verified
                    </div>
                  </div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md z-10 group-hover:scale-105 transition-transform duration-300">
                    <Image src={guide.img} alt={guide.name} fill className="object-cover" sizes="112px" />
                  </div>
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001F54]/5 to-[#FFD700]/10"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#001F54] transition-colors">{guide.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm gap-1 mt-1">
                        <MapPin size={14} /> {guide.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-xl text-[#001F54]">${guide.price}</div>
                      <div className="text-xs text-gray-400">per day</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                    <span className="font-bold text-gray-900">{guide.rating}</span>
                    <span className="text-gray-500 text-sm">({guide.reviews})</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {guide.specialties.map(spec => (
                      <span key={spec} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      onClick={() => setSelectedGuide(guide)}
                      className="col-span-3 py-2.5 border-2 border-[#001F54] text-[#001F54] font-bold rounded-xl hover:bg-[#001F54] hover:text-white transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleQuickAdd(guide)}
                      className="col-span-1 py-2.5 bg-gray-50 text-[#001F54] rounded-xl hover:bg-[#FFD700] transition-colors flex items-center justify-center border border-gray-100 hover:border-transparent"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedGuide && (
        <GuideDetailModal 
          guide={{
            id: selectedGuide.id,
            name: selectedGuide.name,
            city: selectedGuide.city,
            dailyRate: selectedGuide.price,
            certificationId: selectedGuide.certificationId,
            rating: selectedGuide.rating,
            reviews: selectedGuide.reviews,
            img: selectedGuide.img
          }} 
          onClose={() => setSelectedGuide(null)} 
        />
      )}
    </div>
  );
}
