import {configureStore} from '@reduxjs/toolkit'
import userSlice from './auth'
import noteSlice from './note'
import postSlice from './posts'
import commentsSlice from './comments'


export function makeStore(){
    return configureStore({
        reducer:{
            userSlice,
            noteSlice,
            postSlice,
            commentsSlice,
        }
    })
}


export const store = makeStore()