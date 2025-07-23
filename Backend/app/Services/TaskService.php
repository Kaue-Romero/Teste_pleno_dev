<?php

namespace App\Services;

use App\Contract\TaskInterface;
use App\DTO\TaskDTO;
use App\Enum\TaskStatus;
use App\Models\Task;

class TaskService implements TaskInterface
{
    public function __construct() {}

    public function getAllItems(): array
    {
        return Task::paginate(10)->toArray();
    }

    public function find(int $id): TaskDTO
    {
        $task = Task::findOrFail($id);
        if (!$task) {
            throw new \Exception('Task not found');
        }
        return (new TaskDTO(
            $task->id,
            $task->title,
            $task->description,
            $task->status,
            $task->completed,
            $task->created_at,
            $task->updated_at
        ));
    }

    public function create(
        string $title,
        ?string $description = null,
        TaskStatus $status = TaskStatus::PENDING,
        bool $completed = false
    ): TaskDTO {
        $data = [
            'title' => $title,
            'description' => $description,
            'status' => $status->value,
            'completed' => $completed,
        ];

        $task = Task::create($data);

        if (!$task) {
            throw new \Exception('Failed to create task');
        }

        return new TaskDTO(
            $task->id,
            $task->title,
            $task->description,
            TaskStatus::from($task->status),
            $task->completed,
            $task->created_at,
            $task->updated_at
        );
    }

    public function update(
        int $id,
        ?string $title,
        ?string $description,
        ?TaskStatus $status,
        ?bool $completed
    ): TaskDTO {
        $task = Task::findOrFail($id);
        if (!$task) {
            throw new \Exception('Task not found');
        }

        $task->title = $title ?? $task->title;
        $task->description = $description ?? $task->description;
        if ($status !== null) {
            $task->status = $status->value;
        }
        if ($completed !== null) {
            $task->completed = $completed;
        }

        if (!$task->save()) {
            throw new \Exception('Failed to update task');
        }

        return new TaskDTO(
            $task->id,
            $task->title,
            $task->description,
            TaskStatus::from($task->status),
            $task->completed,
            $task->created_at,
            $task->updated_at
        );
    }

    public function delete(int $id): bool
    {
        $task = Task::findOrFail($id);
        if (!$task) {
            throw new \Exception('Task not found');
        }

        if (!$task->delete()) {
            throw new \Exception('Failed to delete task');
        }

        return true;
    }
}
