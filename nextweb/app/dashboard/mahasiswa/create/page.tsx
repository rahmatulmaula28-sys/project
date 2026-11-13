
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function CreateMahasiswaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const token = Cookies.get("token");

    if (!token) {
      alert("Token tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            nim: formData.nim,
            nama: formData.nama,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert("Data mahasiswa berhasil disimpan!");

        router.push("/dashboard/mahasiswa");
        router.refresh();
      } else {
        if (result.errors) {
          const pesan = Object.values(result.errors)
            .flat()
            .join("\n");

          alert(pesan);
        } else {
          alert(
            result.message || "Gagal menyimpan data mahasiswa"
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server Laravel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tambah Mahasiswa
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Input NIM */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            NIM
          </label>

          <input
            type="text"
            required
            value={formData.nim}
            onChange={(e) =>
              setFormData({
                ...formData,
                nim: e.target.value,
              })
            }
            placeholder="Masukkan NIM"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>

          <input
            type="text"
            required
            value={formData.nama}
            onChange={(e) =>
              setFormData({
                ...formData,
                nama: e.target.value,
              })
            }
            placeholder="Masukkan nama lengkap"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tombol */}
        <div className="flex space-x-3 pt-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Menyimpan..." : "Simpan Data"}
          </button>

          <Link
            href="/dashboard/mahasiswa"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Batal
          </Link>

        </div>
      </form>
    </div>
  );
}
