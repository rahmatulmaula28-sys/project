import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import LogoutButton from "./components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Suspense fallback={<div className="w-64 p-5">Memuat Sidebar...</div>}>
        <Sidebar />
      </Suspense>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">
          <div className="text-gray-500 font-medium">
            Panel Administrasi
          </div>

          <LogoutButton />
        </header>

        {/* Konten Halaman */}
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}