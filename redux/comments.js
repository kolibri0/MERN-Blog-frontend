import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../components/axios'

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({postId, commentText}) =>{
        const res = await axios.post(`/comments/${postId}`, {text: commentText})
        return res.data
    }
)

export const editComment = createAsyncThunk(
    'comments/editComment',
    async ({idChange, commentText}) =>{
        const res = await axios.patch(`/comments/${idChange}`, {text: commentText})
        return res.data
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({postId, commentId}) =>{
        const res = await axios.delete(`posts/${postId}/comments/${commentId}`)
        return res.data
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState: null,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createComment.fulfilled, (state, action) =>{
        })
        builder.addCase(editComment.fulfilled, (state, action) =>{
        })
        builder.addCase(deleteComment.fulfilled, (state, action) =>{
        })
    }
})
export default commentsSlice.reducer