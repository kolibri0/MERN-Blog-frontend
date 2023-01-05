import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import todoSlice from './todoSlice';
const store = configureStore({
    reducer: {
        userSlice,
        todoSlice,
    }
})

export default store;