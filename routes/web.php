<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Input;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/hasilinvoice', function () {
    $id = Input::get('id');
    return view('hasil', ['id' => $id]);
});

