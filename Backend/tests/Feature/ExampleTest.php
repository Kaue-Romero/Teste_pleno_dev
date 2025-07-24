<?php

use App\Enum\TaskStatus;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('homepage returns 200', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});

test('task can be created via factory', function () {
    $task = Task::factory()->make(['title' => 'Test task']);
    $this->assertEquals('Test task', $task->title);
});

test('can list tasks via API', function () {
    Task::factory()->count(3)->create();

    $response = $this->getJson('/api/tasks');

    $response->assertOk();

    $this->assertGreaterThanOrEqual(3, count($response->json()));
});

test('can create task via API', function () {
    $payload = [
        'title' => 'New Task',
        'description' => 'Task description',
        'completed' => false,
        'status' => TaskStatus::PENDING->value,
    ];

    $response = $this->postJson('/api/tasks', $payload);

    $response->assertCreated()
             ->assertJsonFragment(['title' => 'New Task']);

    $this->assertDatabaseHas('tasks', ['title' => 'New Task']);
});

test('can show single task via API', function () {
    $task = Task::factory()->create();

    $response = $this->getJson("/api/tasks/{$task->id}");

    $response->assertOk()
             ->assertJsonFragment(['id' => $task->id, 'title' => $task->title]);
});

test('can update task via API', function () {
    $task = Task::factory()->create(['title' => 'Old Title', 'completed' => false]);

    $payload = [
        'title' => 'Updated Title',
        'completed' => true,
    ];

    $response = $this->putJson("/api/tasks/{$task->id}", $payload);

    $response->assertOk()
             ->assertJsonFragment(['title' => 'Updated Title', 'completed' => true]);

    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'title' => 'Updated Title',
        'completed' => true,
    ]);
});

test('can delete task via API', function () {
    $task = Task::factory()->create();

    $response = $this->deleteJson("/api/tasks/{$task->id}");

    $response->assertOk();

    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});
