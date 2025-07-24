<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_tasks()
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_can_create_task()
    {
        $payload = [
            'title' => 'New Task',
            'description' => 'Task description',
            'completed' => false,
        ];

        $response = $this->postJson('/api/tasks', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'New Task']);

        $this->assertDatabaseHas('tasks', ['title' => 'New Task']);
    }

    public function test_can_show_task()
    {
        $task = Task::factory()->create();

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $task->id]);
    }

    public function test_can_update_task()
    {
        $task = Task::factory()->create([
            'title' => 'Old Title',
            'completed' => false,
        ]);

        $payload = [
            'title' => 'Updated Title',
            'completed' => true,
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $payload);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Updated Title', 'completed' => true]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Title',
            'completed' => true,
        ]);
    }

    public function test_can_delete_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}
