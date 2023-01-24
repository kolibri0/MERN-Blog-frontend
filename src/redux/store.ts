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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch