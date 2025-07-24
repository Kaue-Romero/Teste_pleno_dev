import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlices';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
