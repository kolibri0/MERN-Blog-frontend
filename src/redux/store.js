import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import todoSlice from './todoSlice'
import noteSlice from './noteSlice'
const store = configureStore({
    reducer: {
        userSlice,
        todoSlice,
        noteSlice,
    }
})

export default store;