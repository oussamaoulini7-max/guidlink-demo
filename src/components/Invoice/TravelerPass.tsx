"use client";

import { CheckCircle, Download, MessageCircle, ShieldCheck } from "lucide-react";

interface TravelerPassProps {
  bookingId: string;
  guideName: string;
  certificationId: string;
  totalAmount: number;
}

export default function TravelerPass({
  bookingId,
  guideName,
  certificationId,
  totalAmount,
}: TravelerPassProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
      <div className="bg-[#001F54] p-6 text-center text-white">
        <ShieldCheck size={48} className="mx-auto mb-3 text-[#FFD700]" />
        <h2 className="text-2xl font-bold">Official Traveler Pass</h2>
        <p className="text-blue-200 text-sm mt-1">Booking Confirmed</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Booking ID</span>
          <span className="font-mono font-bold text-gray-900">{bookingId}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Verified Guide</span>
          <div className="text-right">
            <div className="font-bold text-gray-900">{guideName}</div>
            <div className="text-xs text-green-600 flex items-center justify-end gap-1 mt-1">
              <CheckCircle size={12} /> Cert: {certificationId}
            </div>
          </div>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Total Paid</span>
          <span className="font-bold text-[#001F54]">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button 
            onClick={() => window.location.href = `/chat-access?bookingId=${bookingId}`}
            className="w-full py-3 bg-[#FFD700] hover:bg-yellow-500 text-[#001F54] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={20} />
            Access Secure Chat
          </button>
          
          <button 
            onClick={() => {
              const element = document.createElement("a");
              const file = new Blob([`Invoice for Booking ${bookingId}\nGuide: ${guideName}\nAmount: $${totalAmount.toFixed(2)}`], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              element.download = `Invoice-${bookingId}.txt`;
              document.body.appendChild(element);
              element.click();
            }}
            className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200"
          >
            <Download size={20} />
            Download Digital Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
