<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    function setUp()
    {
        parent::setUp();
        $this->user = User::create(['name' => 'foo', 'email' => 'foo@example.com', 'password' => 'abcdef']);
        $this->actingAs($this->user);
    }

    function test_index_should_return_empty_list_when_no_tasks_registered()
    {
        $this->json('GET', '/api/tasks')
            ->assertStatus(200)
            ->assertExactJson([]);
    }

    function test_index_should_return_tasks()
    {
        $task1 = new Task(['user_id' => 1, 'description' => 'task1']);
        $task1->setCreatedAt('2000-01-01 00:00:00')->save();

        $task2 = new Task(['user_id' => 1, 'description' => 'task2']);
        $task2->setCreatedAt('2000-01-01 00:00:01')->save();

        $this->json('GET', '/api/tasks')
            ->assertStatus(200)
            ->assertJson([
                ['id' => 2, 'description' => 'task2'],
                ['id' => 1, 'description' => 'task1'],
            ]);
    }

    function test_show_should_return_task()
    {
        Task::create(['user_id' => 1, 'description' => 'task1']);

        $this->json('GET', '/api/tasks/1')
            ->assertStatus(200)
            ->assertJson(['id' => 1, 'description' => 'task1']);
    }

    function test_show_should_return_404_when_not_exist()
    {
        $this->json('GET', '/api/tasks/1')
            ->assertStatus(404)
            ->assertExactJson([
                'error' => [
                    'status' => 404,
                    'text' => 'Not Found',
                ]
            ]);
    }

    function test_store_should_save_task()
    {
        $data = ['description' => 'task1'];
        $this->json('POST', '/api/tasks', $data)
            ->assertStatus(201);
        $this->assertSame(1, Task::count());
    }

    function test_store_should_return_error_when_validation_fail()
    {
        $this->json('POST', '/api/tasks', [])
            ->assertStatus(422)
            ->assertJsonStructure(['errors' => ['description']]);
        $this->assertSame(0, Task::count());
    }

    function test_update_should_update_task()
    {
        Task::create(['user_id' => 1, 'description' => 'task1']);

        $this->json('PATCH', '/api/tasks/1', ['description' => 'modified'])
            ->assertStatus(200);

        $task = Task::find(1);
        $this->assertSame('modified', $task->description);
    }
}
