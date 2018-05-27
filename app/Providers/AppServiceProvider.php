<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (PHP_SAPI === 'cli-server') {
            $monolog = \Log::getMonolog();
            $monolog->pushHandler(new \Monolog\Handler\StreamHandler('php://stdout'));

            $message = sprintf('access : %s %s', \Request::method(), \Request::getRequestUri());
            \Log::debug($message, \Request::all());

            \DB::listen(function ($query) {
                \Log::info("Query {$query->time}ms [{$query->sql}]", $query->bindings);
            });

            if (\DB::connection() instanceof \Illuminate\Database\SQLiteConnection) {
                \DB::statement(\DB::raw('PRAGMA foreign_keys=1'));
            }
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
