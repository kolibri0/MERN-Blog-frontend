import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'


const initialState = {
    todos: null
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (user) =>{
        const res = await axios.get(`http://localhost:5000/todos`, user)
        return res.data
    }
)
export const createTodos = createAsyncThunk(
    'todos/createTodos',
    async (text, user) =>{
        const info = {text, user}
        const res = await axios.post(`http://localhost:5000/todos`, info)
        return res.data
    }
)
export const deleteTodos = createAsyncThunk(
    'todos/deleteTodos',
    async (id) =>{
        const res = await axios.delete(`http://localhost:5000/todos/${id}`)
        return res.data
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getTodos.fulfilled, (state, action) =>{
            state.todos = action.payload.todos
        })
        builder.addCase(createTodos.fulfilled, (state, action) =>{
            state.todos.push(action.payload.todos)
        })
        builder.addCase(deleteTodos.fulfilled, (state, action) =>{
            state.todos = action.payload.todos
        })
    }
})


export default todoSlice.reducer