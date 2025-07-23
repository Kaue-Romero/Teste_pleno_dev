<?php

namespace App\Contracts;

use App\DTO\TaskDTO;
use App\Enum\TaskStatus;

interface TaskInterface
{
    /**
     * Get all tasks.
     *
     * @return TaskDTO[]
     * @throws \Exception
     */
    public function getAllItems(): array;

    /**
     * Find a task by ID.
     *
     * @param int $id
     * @return TaskDTO
     * @throws \Exception
     */
    public function find(int $id): TaskDTO;

    /**
     * Create a new task.
     *
     * @param string $title
     * @param string|null $description
     * @param TaskStatus $status
     * @param bool $completed
     * @return TaskDTO
     * @throws \Exception
     */
    public function create(
        string $title,
        ?string $description = null,
        TaskStatus $status = TaskStatus::PENDING,
        bool $completed = false
    ): TaskDTO;

    /**
     * Update an existing task.
     *
     * @param int $id
     * @param string $title
     * @param string|null $description
     * @param TaskStatus $status
     * @param bool $completed
     * @return TaskDTO
     * @throws \Exception
     */
    public function update(
        int $id,
        ?string $title,
        ?string $description,
        ?TaskStatus $status,
        ?bool $completed
    ): TaskDTO;

    /**
     * Delete a task by ID.
     *
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function delete(int $id): bool;
}
