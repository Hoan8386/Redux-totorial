// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter.slide'
import userReducer from './user/user.slide'
// Nếu sau này bạn thêm reducer, đưa vào đây
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
})

// ✅ Tự động suy luận kiểu của state và dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
