<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $fillable = [
        'nidn',
        'nip',
        'tmt',
        'nama_lengkap',
        'jenis_kelamin',
        'foto',
        'bidang_keilmuan',
        'jabatan_fungsional',
        'status',
    ];
}