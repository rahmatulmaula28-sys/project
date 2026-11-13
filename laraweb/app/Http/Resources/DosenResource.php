<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DosenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nidn' => $this->nidn,
            'nip' => $this->nip,
            'tmt' => $this->tmt,
            'nama_lengkap' => $this->nama_lengkap,
            'jenis_kelamin' => $this->jenis_kelamin,
            'foto' => $this->foto,
            'bidang_keilmuan' => $this->bidang_keilmuan,
            'jabatan_fungsional' => $this->jabatan_fungsional,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}