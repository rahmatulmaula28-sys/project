
"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    const token = Cookies.get("token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (res.ok) {
        router.refresh();
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 cursor-pointer"
    >
      Hapus
    </button>
  );
}
