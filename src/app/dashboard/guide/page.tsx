"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  Settings, 
  LogOut, 
  MapPin, 
  ShieldCheck,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function GuideDashboard() {
  const { user, logout } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/guide/data?userId=${user.id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    window.location.href = "/professional-portal";
  };

  if (loading) return <div className="p-20 text-center font-bold text-[#001F54]">Loading Profile Data...</div>;

  // Mock Data
  const stats = [
    { label: "Active Bookings", value: data?.stats?.activeBookings || 0, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Earnings", value: `$${data?.stats?.totalEarnings || 0}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { label: "Guide Rating", value: data?.stats?.rating || 0, icon: Star, color: "text-[#FFD700]", bg: "bg-yellow-50" },
    { label: "Unique Travelers", value: data?.stats?.travelers || 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const bookings = [
    { id: "BK-102", traveler: "John Doe", city: "Zagora", date: "Oct 24, 2026", status: "Upcoming", amount: "$150" },
    { id: "BK-098", traveler: "Sarah Smith", city: "Zagora", date: "Oct 20, 2026", status: "Completed", amount: "$300" },
    { id: "BK-095", traveler: "Marc G.", city: "Zagora", date: "Oct 18, 2026", status: "Completed", amount: "$150" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001F54] text-white flex flex-col p-6 fixed h-full">
        <div className="text-2xl font-bold tracking-tight mb-10">
          Guide<span className="text-[#FFD700]">Link</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-800/50 rounded-xl font-medium">
            <Calendar size={20} /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <Users size={20} /> My Travelers
          </Link>
          <Link href="/chat-access" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <MessageSquare size={20} /> Messages
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <Settings size={20} /> Profile Settings
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-blue-200 hover:text-white transition-colors mt-auto"
        >
          <LogOut size={20} /> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Ahmed"}!</h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your bookings today.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-[#001F54] font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="pr-2">
              <div className="text-sm font-bold text-gray-900">{user?.name || "Ahmed R."}</div>
              <div className="text-xs text-green-600 font-bold flex items-center"><ShieldCheck size={12} className="mr-1"/> MGC-1002</div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <button className="text-[#001F54] font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {data?.profile?.bookings?.length === 0 && <div className="text-center py-10 text-gray-400">No bookings yet.</div>}
            {data?.profile?.bookings?.map((booking: any) => (
              <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#001F54] font-bold">
                    {booking.traveler.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{booking.traveler.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(booking.createdAt).toLocaleDateString()} • {booking.duration} days
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-right">
                    <div className="font-bold text-[#001F54]">${booking.totalAmount}</div>
                    <div className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">
                      {booking.status}
                    </div>
                  </div>
                  <Link 
                    href={`/chat-access?bookingId=${booking.id}`}
                    className="p-2 text-[#001F54] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <MessageSquare size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
