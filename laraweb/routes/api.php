
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MahasiswaController;
use App\Http\Controllers\Api\DosenController;
use App\Http\Controllers\Api\ProgramStudiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route Login
Route::post('/login', [AuthController::class, 'login']);

// Route Refresh Token
Route::get('/refresh-token', [AuthController::class, 'refresh_token']);

// Route Logout
Route::post('/logout', [AuthController::class, 'logout']);

// Route CRUD Mahasiswa
Route::apiResource('/mahasiswa', MahasiswaController::class);

// Route Program Studi
Route::get('/program-studi', [ProgramStudiController::class, 'index']);

// Route CRUD Dosen
Route::get('/dosen', [DosenController::class, 'index']);
Route::post('/dosen', [DosenController::class, 'store']);
Route::get('/dosen/{dosen}', [DosenController::class, 'show']);
Route::put('/dosen/{dosen}', [DosenController::class, 'update']);
Route::delete('/dosen/{dosen}', [DosenController::class, 'destroy']);

// Route Profil Pengguna
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});
