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
                    'email' => 'administrator@email.com',
                    'password' => bcrypt('administrator'),
                    'rights' => '10'
                ],
                [
                    'name' => 'SuperCourier',
                    'email' => 'SuperCourier@email.com',
                    'password' => bcrypt('SuperCourier'),
                    'rights' => '3'
                ],
                [
                    'name' => 'SuperPartner',
                    'email' => 'SuperPartner@email.com',
                    'password' => bcrypt('SuperPartner'),
                    'rights' => '6'
                ]
            ]
        );
    }
}
