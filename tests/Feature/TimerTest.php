<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use App\Models\Timer;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TimerTest extends TestCase
{
    use RefreshDatabase;

    function setUp()
    {
        parent::setUp();
        $this->user = User::create(['name' => 'foo', 'email' => 'foo@example.com', 'password' => 'abcdef']);
        $this->actingAs($this->user);
    }

    function test_index()
    {
        $this->json('GET', '/api/timers')
            ->assertStatus(200)
            ->assertExactJson([]);

        $this->json('POST', '/api/timers', ['comment' => 'time1']);
        $this->json('POST', '/api/timers', ['comment' => 'time2']);

        $this->json('GET', '/api/timers')
            ->assertStatus(200)
            ->assertJson([
                ['comment' => 'time2'],
                ['comment' => 'time1'],
            ]);
    }

    function test_store()
    {
        $this->json('POST', '/api/timers')
            ->assertStatus(200);
        $this->assertSame(1, Timer::count());
    }

    function test_update()
    {
        Timer::create([
            'user_id' => 1,
            'task_id' => 3,
            'started_at' => '2001-01-01 00:00:00',
            'stopped_at' => null,
            'comment' => 'entry1',
        ]);

        $this->json('PATCH', '/api/timers/1', ['stopped_at' => '2001-01-01 01:00:00'])
            ->assertStatus(200)
            ->assertJson(['stopped_at' => '2001-01-01T01:00:00Z']);
    }
}
