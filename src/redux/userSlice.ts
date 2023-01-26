import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../axios'
import { IUser } from '../Interface/IUser'
import { RootState } from './store'

interface IinitialState{
    user: IUser | null,
    error: null | boolean
}

const initialState: IinitialState = {
    user: null,
    error: null 
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (info) =>{
        const res = await axios.post(`register`, info)
        return res.data
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (info) =>{
        const res = await axios.post(`login`, info)
        return res.data
    }
)

export const checkMe = createAsyncThunk(
    'user/checkMe',
    async () =>{
        const res = await axios.get(`me`)
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
            console.log(state.error)
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