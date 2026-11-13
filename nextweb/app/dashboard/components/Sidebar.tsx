"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Beranda",
      href: "/dashboard",
    },
    {
      name: "Profil Pengguna",
      href: "/dashboard/profil",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-400">
          Sistem Kampus
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded transition ${
                isActive
                  ? "bg-blue-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}