
export default function ProfilPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Profil Pengguna
      </h1>

      <p className="text-gray-600 mb-6">
        Berikut merupakan informasi profil pengguna.
      </p>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nama Pengguna</p>
          <p className="font-semibold text-gray-800">
            Rahmatul Maula
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold text-gray-800">
            rahmatulmaula@example.com
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status Akun</p>
          <p className="font-semibold text-green-600">
            Terautentikasi
          </p>
        </div>
      </div>
    </div>
  );
}
