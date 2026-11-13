
import Link from "next/link";
import { cookies } from "next/headers";
import DeleteButton from "./components/DeleteButton";

// Tipe data Mahasiswa
export interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
}

// Mengambil data mahasiswa dari API Laravel
async function getMahasiswas(): Promise<Mahasiswa[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data mahasiswa");
  }

  const json = await res.json();
  return json.data;
}

// Halaman Data Mahasiswa
export default async function MahasiswaPage() {
  const mahasiswas = await getMahasiswas();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

      {/* Judul Halaman */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Data Mahasiswa
        </h1>

        <Link
          href="/dashboard/mahasiswa/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Data
        </Link>
      </div>

      {/* Tabel Mahasiswa */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                ID
              </th>

              <th className="px-6 py-3 text-left">
                NIM
              </th>

              <th className="px-6 py-3 text-left">
                Nama
              </th>

              <th className="px-6 py-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {mahasiswas.map((mhs) => (
              <tr key={mhs.id}>

                <td className="px-6 py-4 text-sm">
                  {mhs.id}
                </td>

                <td className="px-6 py-4 text-sm">
                  {mhs.nim}
                </td>

                <td className="px-6 py-4 text-sm">
                  {mhs.nama}
                </td>

                <td className="px-6 py-4 text-center space-x-3">

                  <Link
                    href={`/dashboard/mahasiswa/${mhs.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>

                  <DeleteButton id={mhs.id} />

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Jika data kosong */}
      {mahasiswas.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          Belum ada data mahasiswa.
        </p>
      )}

    </div>
  );
}
