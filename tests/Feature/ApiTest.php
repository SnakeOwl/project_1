<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiTest extends TestCase
{
    public function test_api_is_working(): void
    {
        $response = $this
            //->actingAs($user)
            //->withToken("token")
            ->get("/api");
            

        // $response->assertEquals("Api is working");

        $response->assertOk();

        // $response->assertJsonPath("data.name", []);
    }

}
