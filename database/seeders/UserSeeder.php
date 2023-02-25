<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                [
                    'name' => 'administrator',
                    'email' => 'administrator@gmail.com',
                    'password' => bcrypt('administrator'),
                    'rights' => '10'
                ],
                [
                    'name' => 'SuperCourier',
                    'login' => 'SuperCourier@gmail.com',
                    'password' => bcrypt('SuperCourier'),
                    'rights' => '3'
                ]
            ]
        );
    }
}
