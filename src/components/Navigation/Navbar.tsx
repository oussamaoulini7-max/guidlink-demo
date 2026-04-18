"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function Navbar() {
  const cartItemsCount = useCartStore((state) => state.items.length);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#001F54] tracking-tight">
              Guide<span className="text-[#FFD700]">Link</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[#001F54] font-medium transition-colors">Home</Link>
            <Link href="/guides" className="text-gray-600 hover:text-[#001F54] font-medium transition-colors">Find Guides</Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-[#001F54] font-medium transition-colors">How it Works</Link>
            <Link href="/professional-portal" className="text-gray-600 hover:text-[#001F54] font-medium transition-colors">Professional Portal</Link>
            <Link href="/chat-access" className="text-gray-600 hover:text-[#001F54] font-medium transition-colors">Chat Access</Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/auth/traveler" className="text-[#001F54] font-bold hover:underline transition-all">
              Traveler Login
            </Link>
            <Link href="/checkout" className="relative text-[#001F54] hover:text-blue-800 transition-colors">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-[#001F54] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/checkout" className="relative text-[#001F54]">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-[#001F54] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-[#001F54] focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md">Home</Link>
            <Link href="/guides" className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md">Find Guides</Link>
            <Link href="/#how-it-works" className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md">How it Works</Link>
            <Link href="/professional-portal" className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md">Professional Portal</Link>
            <Link href="/chat-access" className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md">Chat Access</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
