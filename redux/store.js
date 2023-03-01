import {configureStore} from '@reduxjs/toolkit'
import userSlice from './auth'
import noteSlice from './note'
    



export function makeStore(){
    return configureStore({
        reducer:{
            userSlice,
            noteSlice
        }
    })
}


export const store = makeStore()