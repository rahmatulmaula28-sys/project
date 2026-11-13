<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DosenResource;
use App\Models\Dosen;
use Illuminate\Http\Request;

class DosenController extends Controller
{
    // Menampilkan semua data dosen
    public function index()
    {
        $dosen = Dosen::all();

        return DosenResource::collection($dosen);
    }

    // Menambahkan data dosen
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nidn' => 'required|unique:dosens,nidn',
            'nip' => 'nullable|unique:dosens,nip',
            'tmt' => 'nullable|date',
            'nama_lengkap' => 'required',
            'jenis_kelamin' => 'nullable|boolean',
            'foto' => 'nullable|string',
            'bidang_keilmuan' => 'nullable|string',
            'jabatan_fungsional' => 'nullable|in:tenaga pengajar,asisten ahli,lektor,lektor kepala,guru besar',
            'status' => 'nullable|in:aktif,cuti,ijin belajar,tugas di instansi lain,tugas belajar',
        ]);

        $dosen = Dosen::create($validated);

        return new DosenResource($dosen);
    }

    // Menampilkan satu data dosen
    public function show(Dosen $dosen)
    {
        return new DosenResource($dosen);
    }

    // Mengubah data dosen
    public function update(Request $request, Dosen $dosen)
    {
        $validated = $request->validate([
            'nidn' => 'required|unique:dosens,nidn,' . $dosen->id,
            'nip' => 'nullable|unique:dosens,nip,' . $dosen->id,
            'tmt' => 'nullable|date',
            'nama_lengkap' => 'required',
            'jenis_kelamin' => 'nullable|boolean',
            'foto' => 'nullable|string',
            'bidang_keilmuan' => 'nullable|string',
            'jabatan_fungsional' => 'nullable|in:tenaga pengajar,asisten ahli,lektor,lektor kepala,guru besar',
            'status' => 'nullable|in:aktif,cuti,ijin belajar,tugas di instansi lain,tugas belajar',
        ]);

        $dosen->update($validated);

        return new DosenResource($dosen);
    }

    // Menghapus data dosen
    public function destroy(Dosen $dosen)
    {
        $dosen->delete();

        return response()->json([
            'message' => 'Data dosen berhasil dihapus'
        ]);
    }
}