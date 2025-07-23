import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addItem } from '../utils/axiosInstance';

export interface Todo {
    id: number;
    text: string;
    status: 'pending' | 'ongoing' | 'concluded';
    description?: string;
    completed: boolean;
    createdAt: string;
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
                todo.status = action.payload.status;
                todo.completed = action.payload.status === 'concluded';
            }
        },
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<{ text: string; description: string }>) {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.text.trim(),
                completed: false,
                description: action.payload.description.trim(),
                status: 'pending',
                createdAt: new Date().toLocaleString(),
            };
            addItem(newTodo).then((response) => {
                console.log('Todo added successfully:', response.data);
            }).catch((error) => {
                console.error('Error adding todo:', error);
            });
            state.todos.push(newTodo);
        },
        toggleTodo(state, action: PayloadAction<number>) {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        startEditing(state, action: PayloadAction<{
            description: string; id: number; text: string
        }>) {
            console.log('Starting edit for ID:', action.payload.id);
            state.editingId = action.payload.id;
            state.editingText = action.payload.text;
            state.editingTextDescription = action.payload.description;
        },
        saveEdit(state) {
            if (state.editingId !== null) {
                const todo = state.todos.find((t) => t.id === state.editingId);
                if (todo) {
                    todo.text = state.editingText;
                }
                state.editingId = null;
                state.editingText = '';
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
    toggleTodo,
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
