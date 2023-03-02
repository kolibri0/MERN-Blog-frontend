import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../components/axios'


const initialState = {
    note: [],
}

export const getAllNote = createAsyncThunk(
    'note/getAllNote',
    async () =>{
        const res = await axios.get(`/note`)
        return res.data
    }
)

export const createNote = createAsyncThunk(
    'note/createNote',
    async ({text, title}) =>{
        const data = {text, title}
        const res = await axios.post(`/note`, data)
        return res.data
    }
)

export const changeNote = createAsyncThunk(
    'note/changeNote',
    async ({id, text, title}) =>{
        const data = {text, title}
        const res = await axios.patch(`/note/${id}`, data)
        return res.data
    }
)

export const deleteNote = createAsyncThunk(
    'note/deleteNote',
    async (id) =>{
        const res = await axios.delete(`/note/${id}`)
        return res.data
    }
)

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getAllNote.pending, (state, action) =>{
            state.note = []
        })
        builder.addCase(getAllNote.fulfilled, (state, action) =>{
            state.note = action.payload.note
        })
        builder.addCase(createNote.fulfilled, (state, action) =>{
            state.note.push(action.payload.note)
        })
        builder.addCase(changeNote.fulfilled, (state, action) =>{
            
        })
        builder.addCase(deleteNote.fulfilled, (state, action) =>{
            state.note = action.payload.note
        })
    }
})

export default noteSlice.reducer