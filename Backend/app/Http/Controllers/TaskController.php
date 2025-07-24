<?php

namespace App\Http\Controllers;

use App\Contracts\TaskInterface;
use App\Enum\TaskStatus;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\isNan;

class TaskController extends Controller
{
    public function __construct(protected TaskInterface $taskInterface) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tasks = $this->taskInterface->getAllItems();
            return response()->json($tasks);
        } catch (\Exception $e) {
            Log::error('Error fetching tasks: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch tasks'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $task = $this->taskInterface->find($id);
            return response()->json($task);
        } catch (\Exception $e) {
            Log::error('Error fetching task: ' . $e->getMessage());
            return response()->json(['error' => 'Task not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTaskRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $task = $this->taskInterface->create(
                $validatedData['title'],
                $validatedData['description'] ?? null
            );
            return response()->json($task, 201);
        } catch (\Exception $e) {
            Log::error('Error creating task: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create task'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, int $id)
    {
        if (is_nan($id)) {
            return response()->json([
                'error' => 'Invalid task ID. Must be a numeric value.'
            ], 400);
        }

        try {
            $validatedData = $request->validated();
            $status = isset($validatedData['status']) ? TaskStatus::from($validatedData['status']) : null;
            $task = $this->taskInterface->update(
                $id,
                $validatedData['title'] ?? null,
                $validatedData['description'] ?? null,
                $status,
                $validatedData['completed'] ?? null
            );
            return response()->json($task);
        } catch (\Exception $e) {
            Log::error('Error updating task: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update task'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $deleted = $this->taskInterface->delete($id);
            if ($deleted) {
                return response()->json(['message' => 'Task deleted successfully']);
            } else {
                return response()->json(['error' => 'Task not found'], 404);
            }
        } catch (\Exception $e) {
            Log::error('Error deleting task: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete task'], 500);
        }
    }
}
