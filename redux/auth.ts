import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../components/axios'
import { RootState } from './store'
import {IUser} from '../Interface/IUser'
import { IAuth } from '../Interface/IFunctionProps'

interface IInitialState{
    user: null | IUser,
    error: null | Boolean
}

const initialState: IInitialState = {
    user: null,
    error: null 
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (info: IAuth) =>{
        const res = await axios.post(`/register`, info)
        return res.data
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (info: IAuth) =>{
        const res = await axios.post(`/login`, info)
        return res.data
    }
)

export const checkMe = createAsyncThunk(
    'user/checkMe',
    async () =>{
        const res = await axios.get(`/me`)
        return res.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state, action: PayloadAction<null>){
            state.user = action.payload
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) =>{
        //---------------------------------------------------------------------
        builder.addCase(registerUser.fulfilled, (state, action) =>{
            state.user = action.payload
            window.localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(registerUser.rejected, (state, action) =>{
            state.error = true
        })
        //---------------------------------------------------------------------
        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.user = action.payload
            window.localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(loginUser.rejected, (state, action) =>{
            state.error = true
        })
        //---------------------------------------------------------------------
        builder.addCase(checkMe.fulfilled, (state, action) =>{
            state.user = action.payload
        })
        builder.addCase(checkMe.rejected, (state, action) =>{
            state.error = true
        })
        //---------------------------------------------------------------------
    }
})


export const userAuthSelector = (state: RootState) => Boolean(state.userSlice.user)
export const {logout} = userSlice.actions
export default userSlice.reducer