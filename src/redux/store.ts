import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import noteSlice from './noteSlice'
import postSlice from './postSlice'

const store = configureStore({
    reducer: {
        userSlice,
        noteSlice,
        postSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch