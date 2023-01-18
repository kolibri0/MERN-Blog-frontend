import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import todoSlice from './todoSlice'
import noteSlice from './noteSlice'
import postSlice from './postSlice'

const store = configureStore({
    reducer: {
        userSlice,
        todoSlice,
        noteSlice,
        postSlice,
    }
})

export default store;