"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { 
  BarChart3, 
  Users, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp,
  Settings, 
  LogOut, 
  MapPin, 
  ArrowRight,
  AlertTriangle,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { logout } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (guideId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId, action })
      });
      fetchData(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/traveler";
  };

  if (loading) return <div className="p-20 text-center font-bold text-[#001F54]">Loading Platform Data...</div>;

  const stats = [
    { label: "Total Revenue", value: `$${data?.stats?.revenue || 0}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Guides", value: data?.stats?.guides || 0, icon: ShieldCheck, color: "text-[#001F54]", bg: "bg-blue-50" },
    { label: "Redirections", value: data?.stats?.redirections || 0, icon: TrendingDown, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Avg. Mitigation", value: data?.stats?.mitigation || "0%", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const redirectionLogs = [
    { id: "LOG-001", from: "Marrakech", to: "Zagora", status: "Accepted", discount: "10%", date: "2 mins ago" },
    { id: "LOG-002", from: "Fes", to: "Chefchaouen", status: "Accepted", discount: "10%", date: "15 mins ago" },
    { id: "LOG-003", from: "Marrakech", to: "Zagora", status: "Declined", discount: "-", date: "1 hour ago" },
  ];

  const guideApplications = [
    { name: "Omar K.", city: "Merzouga", cert: "MGC-Pending", date: "Today" },
    { name: "Laila M.", city: "Ouarzazate", cert: "MGC-Pending", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001F54] text-white flex flex-col p-6 fixed h-full">
        <div className="text-2xl font-bold tracking-tight mb-10">
          Guide<span className="text-[#FFD700]">Link</span> <span className="text-[10px] bg-[#FFD700] text-[#001F54] px-1.5 py-0.5 rounded ml-1 align-top">ADMIN</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-800/50 rounded-xl font-medium">
            <BarChart3 size={20} /> Platform Overview
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <Users size={20} /> User Management
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <ShieldCheck size={20} /> Guide Approvals
            <span className="ml-auto bg-[#FFD700] text-[#001F54] text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <FileText size={20} /> Platform Logs
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors">
            <Settings size={20} /> System Settings
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
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-gray-500 mt-1">Monitoring GuideLink's circular economy impact.</p>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100 font-bold text-sm">
            <AlertTriangle size={18} />
            3 High-Traffic Zones Alert
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Redirection Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Live Redirection Engine</h2>
              <button className="text-[#001F54] font-bold text-sm hover:underline">Download CSV</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data?.redirectionLogs?.length === 0 && <div className="text-center py-10 text-gray-400">No recent redirections.</div>}
                {data?.redirectionLogs?.map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{log.fromCity} <ArrowRight size={12} className="inline mx-1" /> {log.toCity}</div>
                        <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guide Approval Queue */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Guide Approval Queue</h2>
              <span className="bg-[#FFD700] text-[#001F54] text-xs font-bold px-2 py-1 rounded-md">{data?.pendingGuides?.length || 0} New</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data?.pendingGuides?.map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#001F54] font-bold">
                        {app.user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{app.user.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10}/> {app.city}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAction(app.id, 'APPROVE')}
                        className="px-3 py-1.5 bg-[#001F54] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors border border-dashed border-gray-300">
                View Verification Guidelines
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
