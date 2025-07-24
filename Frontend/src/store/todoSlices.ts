import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addItem, deleteItem, updateItem } from '../utils/axiosInstance';

export interface Todo {
    id?: number;
    title: string;
    status: 'pending' | 'ongoing' | 'concluded';
    description?: string;
    completed: boolean;
    createdAt?: string;
}

interface TodoState {
    todos: Todo[];
    editingId: number | null;
    editingText: string;
    editingTextDescription: string;
    filter: 'all' | 'active' | 'completed';
}
const initialState: TodoState = {
    todos: [],
    editingId: null,
    editingText: '',
    editingTextDescription: '',
    filter: 'all',
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateTodoStatus: (state, action: PayloadAction<{ id: number; status: Todo["status"] }>) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) {
                updateItem(action.payload.id, { status: action.payload.status })
                    .then((response) => {
                        console.log('Todo status updated successfully:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error updating todo status:', error);
                    });
                todo.status = action.payload.status;

            }
        },
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<{ text: string; description: string }>) {
            const newTodo: Todo = {
                title: action.payload.text.trim(),
                completed: false,
                description: action.payload.description.trim(),
                status: 'pending',
            };
            addItem(newTodo).then((response) => {
                console.log('Todo added successfully:', response.data);
            }).catch((error) => {
                console.error('Error adding todo:', error);
            });
            state.todos.push(newTodo);
        },
        deleteTodo(state, action: PayloadAction<number>) {
            deleteItem(action.payload);
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        startEditing(state, action: PayloadAction<{
            description: string; id: number; title: string
        }>) {
            state.editingId = action.payload.id;
            state.editingText = action.payload.title;
            state.editingTextDescription = action.payload.description;
        },
        saveEdit(state) {
            if (state.editingId !== null) {
                updateItem(state.editingId, {
                    title: state.editingText.trim(),
                    description: state.editingTextDescription.trim(),
                }).then((response) => {
                    console.log('Todo edited successfully:', response.data);
                }).catch((error) => {
                    console.error('Error editing todo:', error);
                });
                const todo = state.todos.find((t) => t.id === state.editingId);
                if (todo) {
                    todo.title = state.editingText.trim();
                    todo.description = state.editingTextDescription.trim();
                }
                state.editingId = null;
                state.editingText = '';
                state.editingTextDescription = '';
            }
        },
        cancelEdit(state) {
            state.editingId = null;
            state.editingText = '';
        },
        setEditingText(state, action: PayloadAction<string>) {
            state.editingText = action.payload;
        },
        setEditingTextDescription(state, action: PayloadAction<string>) {
            state.editingTextDescription = action.payload;
        },
        clearCompleted(state) {
            state.todos = state.todos.filter((t) => !t.completed);
        },
        setFilter(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
            state.filter = action.payload;
        },
    },
});

export const {
    addTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    cancelEdit,
    setEditingText,
    setEditingTextDescription,
    clearCompleted,
    setFilter,
    setTodos,
    updateTodoStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
