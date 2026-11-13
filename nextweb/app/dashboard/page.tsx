
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Mengizinkan route menggunakan data dinamis saat request
export const instant = false;

// Fungsi mengambil data pengguna dari API Laravel
async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Memeriksa token pengguna
  if (!token) {
    return null;
  }

  try {
    // Mengambil data pengguna dari Laravel
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    // Memeriksa respons API
    if (!response.ok) {
      return null;
    }

    const user = await response.json();

    return user;

  } catch (error) {
    console.error("Gagal mengambil data pengguna:", error);
    return null;
  }
}

// Halaman utama Dashboard
export default async function DashboardPage() {
  const user = await getUserProfile();

  // Jika pengguna tidak terautentikasi
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      {/* Judul Dashboard */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Selamat Datang, {user.name}!
      </h1>

      

      {/* Tabel Informasi Pengguna */}
      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          {/* Header Tabel */}
          <thead>
            <tr className="bg-gray-100 text-left">

              <th className="border border-gray-200 px-4 py-3">
                Informasi
              </th>

              <th className="border border-gray-200 px-4 py-3">
                Data Pengguna
              </th>

            </tr>
          </thead>

          {/* Isi Tabel */}
          <tbody>

            <tr>
              <td className="border border-gray-200 px-4 py-3 font-medium">
                ID Pengguna
              </td>

              <td className="border border-gray-200 px-4 py-3">
                {user.id}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-3 font-medium">
                Nama Lengkap
              </td>

              <td className="border border-gray-200 px-4 py-3">
                {user.name}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-3 font-medium">
                Email
              </td>

              <td className="border border-gray-200 px-4 py-3">
                {user.email}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-3 font-medium">
                Status Akun
              </td>

              <td className="border border-gray-200 px-4 py-3">
                <span className="text-green-600 font-semibold">
                  Terautentikasi
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
