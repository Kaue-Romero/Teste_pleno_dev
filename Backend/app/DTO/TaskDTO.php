<?php

namespace App\DTO;

use App\Enum\TaskStatus;

class TaskDTO
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public TaskStatus $status,
        public bool $completed,
        public string $created_at,
        public string $updated_at
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status->label(),
            'completed' => $this->completed,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
