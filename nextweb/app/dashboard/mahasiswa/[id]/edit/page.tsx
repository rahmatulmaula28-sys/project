
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function EditMahasiswaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getMahasiswa = async () => {
      const token = Cookies.get("token");

      if (!API_URL) {
        alert("Alamat API belum dikonfigurasi.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/mahasiswa/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
          alert(result.message || `Gagal mengambil data (${res.status})`);
          return;
        }

        const mahasiswa = result.data;

        if (!mahasiswa) {
          alert("Data mahasiswa tidak ditemukan.");
          return;
        }

        setFormData({
          nim: mahasiswa.nim ?? "",
          nama: mahasiswa.nama ?? "",
        });
      } catch (error) {
        console.error("Kesalahan mengambil data:", error);
        alert("Tidak dapat terhubung ke server Laravel.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMahasiswa();
    }
  }, [id, API_URL, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!API_URL || !token) {
      alert("Alamat API atau token tidak ditemukan.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/mahasiswa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          nim: formData.nim,
          nama: formData.nama,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Data mahasiswa berhasil diperbarui!");
        router.push("/dashboard/mahasiswa");
        router.refresh();
      } else if (result.errors) {
        const pesan = Object.values(result.errors).flat().join("\n");
        alert(pesan);
      } else {
        alert(result.message || `Gagal memperbarui data (${res.status})`);
      }
    } catch (error) {
      console.error("Kesalahan update:", error);
      alert("Tidak dapat terhubung ke server Laravel.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Memuat data mahasiswa...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Mahasiswa
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="Masukkan NIM"
          />
        </div>

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
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
