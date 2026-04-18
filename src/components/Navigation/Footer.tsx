import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-[#001F54] tracking-tight">
                Guide<span className="text-[#FFD700]">Link</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
              Morocco's first community-first circular tourism platform. We connect you with certified local guides while protecting our heritage and empowering local communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#001F54] transition-colors"><Globe size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-[#001F54] transition-colors"><Globe size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-[#001F54] transition-colors"><Globe size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#001F54] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/guides" className="text-gray-600 hover:text-[#001F54] transition-colors">Find a Guide</Link></li>
              <li><Link href="/professional-portal" className="text-gray-600 hover:text-[#001F54] transition-colors">Become a Guide</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-600 hover:text-[#001F54] transition-colors">How it Works</Link></li>
              <li><Link href="/chat-access" className="text-gray-600 hover:text-[#001F54] transition-colors">Traveler Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#001F54] mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="text-[#FFD700] shrink-0 mt-1" size={18} />
                <span>Technopark, Casablanca<br/>Morocco, 20000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="text-[#FFD700] shrink-0" size={18} />
                <span>+212 500 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#FFD700] shrink-0" size={18} />
                <span>support@guidelink.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} GuideLink Morocco. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#001F54]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#001F54]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
