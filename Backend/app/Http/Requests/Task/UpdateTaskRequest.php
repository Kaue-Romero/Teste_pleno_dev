<?php

namespace App\Http\Requests\Task;

use App\Enum\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return True;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => [
                'nullable',
                'string',
                'in:' . implode(',', collect(TaskStatus::cases())->map(fn($status) => $status->value)->toArray()),
            ],
            'completed' => 'boolean',
        ];
    }
}
