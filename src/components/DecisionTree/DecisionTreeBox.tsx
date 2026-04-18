"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Check, Ticket, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const CITIES = ["Marrakech", "Fes", "Chefchaouen", "Atlas Mountains"];
const VIBES = ["Foodie", "Historian", "Adventurer", "Relaxation"];

// Mock Guides
const MOCK_GUIDES = [
  { id: "1", name: "Ahmed R.", city: "Zagora", dailyRate: 50, certificationId: "MGC-1002", vibe: "Historian", originalCity: "Marrakech" },
  { id: "2", name: "Fatima Z.", city: "Zagora", dailyRate: 45, certificationId: "MGC-2034", vibe: "Historian", originalCity: "Marrakech" },
  { id: "3", name: "Youssef T.", city: "Zagora", dailyRate: 55, certificationId: "MGC-5531", vibe: "Adventurer", originalCity: "Marrakech" },
  { id: "4", name: "Karim M.", city: "Fes", dailyRate: 60, certificationId: "MGC-1122", vibe: "Foodie", originalCity: "Fes" },
  { id: "5", name: "Sara B.", city: "Chefchaouen", dailyRate: 40, certificationId: "MGC-9988", vibe: "Relaxation", originalCity: "Chefchaouen" },
];

export default function DecisionTreeBox({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [vibe, setVibe] = useState("");
  const [acceptedRedirection, setAcceptedRedirection] = useState<boolean | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setStep(2);
  };

  const handleVibeSelect = (selectedVibe: string) => {
    setVibe(selectedVibe);
    if (city === "Marrakech") {
      setStep(3); // High traffic redirection logic
    } else {
      setStep(4); // Direct to guides
    }
  };

  const handleRedirectionChoice = (accept: boolean) => {
    setAcceptedRedirection(accept);
    setStep(4);
  };

  const finalCity = city === "Marrakech" && acceptedRedirection ? "Zagora" : city;
  const isDiscountApplied = city === "Marrakech" && acceptedRedirection;

  const matchedGuides = MOCK_GUIDES.filter(
    (g) => g.city === finalCity && (g.vibe === vibe || g.originalCity === city)
  ).slice(0, 3);

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="h-2 w-full bg-gray-100">
          <motion.div 
            className="h-full bg-[#001F54]"
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-[#001F54] mb-6">Where is your heart taking you?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      className="flex items-center gap-2 p-4 rounded-xl border-2 border-gray-100 hover:border-[#001F54] hover:bg-gray-50 transition-all font-medium text-gray-700"
                    >
                      <MapPin size={18} className="text-[#001F54]" />
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-[#001F54] mb-6">What is your travel vibe?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {VIBES.map((v) => (
                    <button
                      key={v}
                      onClick={() => handleVibeSelect(v)}
                      className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-gray-100 hover:border-[#FFD700] hover:bg-gray-50 transition-all font-medium text-gray-700"
                    >
                      <Sparkles size={24} className="text-[#FFD700]" />
                      {v}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col justify-center text-center"
              >
                <div className="inline-flex justify-center mb-4">
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <MapPin size={16} />
                    High Traffic Alert: {city}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#001F54] mb-4">Discover a Hidden Gem Instead</h2>
                <p className="text-gray-600 mb-8">
                  {city} is currently experiencing heavy tourism. Based on your {vibe.toLowerCase()} vibe, we highly recommend <strong>Zagora</strong> as a peaceful, authentic alternative.
                </p>

                <div className="bg-[#F8FAFC] border border-[#FFD700] p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-center gap-2 text-[#001F54] font-bold">
                    <Ticket size={20} className="text-[#FFD700]" />
                    Accept and get 10% off your guide!
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleRedirectionChoice(true)}
                    className="flex-1 bg-[#001F54] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors shadow-md"
                  >
                    Yes, take me to Zagora
                  </button>
                  <button
                    onClick={() => handleRedirectionChoice(false)}
                    className="flex-1 bg-white text-gray-700 border-2 border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Stick to {city}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#001F54]">Your Perfect Matches</h2>
                  {isDiscountApplied && (
                    <span className="bg-[#FFD700] text-[#001F54] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      10% Off Applied
                    </span>
                  )}
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                  {matchedGuides.length > 0 ? (
                    matchedGuides.map((guide) => {
                      const finalRate = isDiscountApplied ? guide.dailyRate * 0.9 : guide.dailyRate;
                      return (
                        <div key={guide.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                          <div>
                            <h3 className="font-bold text-gray-900">{guide.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1"><MapPin size={14}/> {guide.city}</span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs">{guide.vibe}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Cert: {guide.certificationId}</div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <div className="font-bold text-[#001F54]">${finalRate.toFixed(2)} / day</div>
                            <button
                              onClick={() => {
                                addItem({
                                  guide: { ...guide, dailyRate: finalRate },
                                  duration: 1, // Default 1 day
                                  numberOfPeople: 1 // Default 1 person
                                });
                                // In a real app, maybe show a toast and close
                                onClose();
                              }}
                              className="px-4 py-2 bg-gray-100 hover:bg-[#001F54] hover:text-white text-[#001F54] text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                            >
                              Add to Trip <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-8">No verified guides available for these criteria.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
