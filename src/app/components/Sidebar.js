"use client";
import { useState } from "react";
import { Home, BarChart2, Layers, Settings } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: <Home size={18} />, href: "/" },
  { label: "Analytics", icon: <BarChart2 size={18} />, href: "/analytics" },
  { label: "Apps", icon: <Layers size={18} />, href: "/apps" },
  { label: "Settings", icon: <Settings size={18} />, href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white border-r transition-all duration-300 shadow-sm fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-indigo-600 text-lg">
          {!collapsed ? "Dashlead" : "D"}
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-indigo-500 focus:outline-none"
        >
          {collapsed ? "➤" : "←"}
        </button>
      </div>

      <nav className="mt-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all">
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
