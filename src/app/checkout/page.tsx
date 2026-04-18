"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import TravelerPass from "@/components/Invoice/TravelerPass";
import { CreditCard, MapPin, Users, Calendar, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalAmount, removeItem, clearCart, updateItem } = useCartStore();
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", cardNumber: "" });
  const [bookingId, setBookingId] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setBookingId("GL-" + Math.random().toString(36).substr(2, 9).toUpperCase());
      setIsPaid(true);
    }, 1500);
  };

  const totalAmount = getTotalAmount();

  if (isPaid && items.length > 0) {
    // Show Traveler Pass for the first guide (simplification for demo)
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#001F54]">Payment Successful!</h1>
            <p className="mt-4 text-lg text-gray-600">Your circular tourism journey begins here.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 justify-center">
            {items.map((item) => (
               <TravelerPass 
                key={item.guide.id}
                bookingId={bookingId}
                guideName={item.guide.name}
                certificationId={item.guide.certificationId}
                totalAmount={item.guide.dailyRate * item.numberOfPeople * item.duration}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => { clearCart(); window.location.href = "/"; }}
              className="text-[#001F54] font-semibold hover:underline"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Summary Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-8 h-fit">
          <h2 className="text-2xl font-bold text-[#001F54] mb-6 border-b pb-4">Your Guide Bookings</h2>
          
          {items.length === 0 ? (
            <p className="text-gray-500 py-8 text-center">Your cart is empty. Try using the Decision Tree to find verified guides!</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.guide.id} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
                  <button 
                    onClick={() => removeItem(item.guide.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="font-bold text-gray-900 mb-1">{item.guide.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                    <MapPin size={14} /> {item.guide.city}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <label className="block text-gray-500 mb-1 text-xs uppercase font-bold tracking-wider">Days</label>
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" onClick={() => updateItem(item.guide.id, { duration: Math.max(1, item.duration - 1) })}>-</button>
                        <span className="flex-1 text-center font-medium">{item.duration}</span>
                        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" onClick={() => updateItem(item.guide.id, { duration: item.duration + 1 })}>+</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 text-xs uppercase font-bold tracking-wider">People</label>
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" onClick={() => updateItem(item.guide.id, { numberOfPeople: Math.max(1, item.numberOfPeople - 1) })}>-</button>
                        <span className="flex-1 text-center font-medium">{item.numberOfPeople}</span>
                        <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" onClick={() => updateItem(item.guide.id, { numberOfPeople: item.numberOfPeople + 1 })}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm text-gray-500">Rate: ${item.guide.dailyRate.toFixed(2)}/day</span>
                    <span className="font-bold text-[#001F54] text-lg">
                      ${(item.guide.dailyRate * item.numberOfPeople * item.duration).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                <span className="font-bold text-gray-700 text-lg">Total</span>
                <span className="font-extrabold text-2xl text-[#001F54]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Form Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#001F54] mb-8">Traveler Details & Payment</h2>
          
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] focus:border-transparent outline-none transition-all"
                placeholder="+212 600-000000"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Card</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  required
                  type="text" 
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] focus:border-transparent outline-none transition-all font-mono"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all font-mono" />
                <input required type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all font-mono" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={items.length === 0}
              className="w-full mt-8 bg-[#001F54] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ${totalAmount.toFixed(2)} Securely
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
