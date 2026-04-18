"use client";

import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import DecisionTreeBox from "../DecisionTree/DecisionTreeBox";

export default function SupportFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-4 bg-[#001F54] text-white rounded-full shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:bg-blue-900 transition-transform hover:scale-105 active:scale-95"
        aria-label="Support Decision Tree"
      >
        <MessageSquarePlus size={28} />
      </button>

      {isOpen && <DecisionTreeBox onClose={() => setIsOpen(false)} />}
    </>
  );
}
