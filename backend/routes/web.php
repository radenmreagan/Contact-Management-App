<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// API Routes
Route::prefix('api')->group(function () {
    Route::resource('contacts', ContactController::class);
});

// Web Routes (jika diperlukan)
Route::get('/', function () {
    return view('welcome');
});