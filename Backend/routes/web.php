<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "hello world";
})->name('home');

require __DIR__.'/auth.php';
