<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dosens', function (Blueprint $table) {
            $table->string('nip', 18)->nullable()->after('nidn');
            $table->date('tmt')->nullable()->after('nip');
            $table->renameColumn('nama', 'nama_lengkap');
            $table->boolean('jenis_kelamin')->default(1)->after('nama_lengkap');
            $table->string('foto')->default('https://www.gravatar.com/avatar/?d=identicon')->after('jenis_kelamin');
            $table->text('bidang_keilmuan')->nullable()->after('foto');

            $table->enum('jabatan_fungsional', [
                'tenaga pengajar',
                'asisten ahli',
                'lektor',
                'lektor kepala',
                'guru besar'
            ])->default('tenaga pengajar')->after('bidang_keilmuan');

            $table->enum('status', [
                'aktif',
                'cuti',
                'ijin belajar',
                'tugas di instansi lain',
                'tugas belajar'
            ])->default('aktif')->after('jabatan_fungsional');

            $table->dropColumn(['email', 'no_hp', 'alamat']);
        });
    }

    public function down(): void
    {
        Schema::table('dosens', function (Blueprint $table) {
            $table->renameColumn('nama_lengkap', 'nama');
            $table->string('email')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('alamat')->nullable();

            $table->dropColumn([
                'nip',
                'tmt',
                'jenis_kelamin',
                'foto',
                'bidang_keilmuan',
                'jabatan_fungsional',
                'status'
            ]);
        });
    }
};