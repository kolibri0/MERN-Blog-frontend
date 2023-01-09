import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'


const initialState = {
    user: null
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (info) =>{
        const res = await axios.post(`http://localhost:5000/register`, info)
        return res.data
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (info) =>{
        const res = await axios.post(`http://localhost:5000/login`, info)
        return res.data
    }
)

export const checkMe = createAsyncThunk(
    'user/checkMe',
    async () =>{
        const res = await axios.get(`http://localhost:5000/me`)
        return res.data
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state, action){
            state.user = action.payload
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUser.fulfilled, (state, action) =>{
            state.user = action.payload
            window.localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.user = action.payload
            window.localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(checkMe.fulfilled, (state, action) =>{
            state.user = action.payload
        })
    }
})


export const userAuthSelector = state => Boolean(state.userSlice.user)
export const {logout} = userSlice.actions
export default userSlice.reducer