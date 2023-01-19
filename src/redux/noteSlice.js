import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'


const initialState = {
    note: [],
    noteItem: {},
}

export const getAllNote = createAsyncThunk(
    'note/getAllNote',
    async () =>{
        const res = await axios.get(`http://localhost:5000/note`)
        return res.data
    }
)

export const getNote = createAsyncThunk(
    'note/getNote',
    async (id) =>{
        const res = await axios.get(`http://localhost:5000/note/${id}`)
        return res.data
    }
)

export const createNote = createAsyncThunk(
    'note/createNote',
    async ({text, title}) =>{
        const data = {text, title}
        const res = await axios.post(`http://localhost:5000/note`, data)
        return res.data
    }
)

export const changeNote = createAsyncThunk(
    'note/changeNote',
    async ({id, text, title}) =>{
        const data = {text, title}
        const res = await axios.patch(`http://localhost:5000/note/${id}`, data)
        return res.data
    }
)

export const deleteNote = createAsyncThunk(
    'note/deleteNote',
    async (id) =>{
        const res = await axios.delete(`http://localhost:5000/note/${id}`)
        return res.data
    }
)

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        show(state, action){
            state.showModal = action.payload
        }
    },
    extraReducers: (builder) =>{
        // builder.addCase(getAllNote.pending, (state, action) =>{
        //     state.note = []
        // })
        builder.addCase(getAllNote.fulfilled, (state, action) =>{
            state.note = action.payload.note
        })
        builder.addCase(createNote.fulfilled, (state, action) =>{
            state.note.push(action.payload.note)
        })
        builder.addCase(changeNote.fulfilled, (state, action) =>{
            console.log(action.payload)
        })
        builder.addCase(getNote.fulfilled, (state, action) =>{
            state.noteItem = action.payload.note
        })
        builder.addCase(deleteNote.fulfilled, (state, action) =>{
            state.note = action.payload.note
        })
    }
})


export const { show } = noteSlice.actions
export default noteSlice.reducer