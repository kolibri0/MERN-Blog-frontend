import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'
import { IPost } from '../Interface/IPost'


interface IinitialState{
    posts: IPost[] | [],
    tags: string[],
    error: boolean,
    loading: boolean
}

const initialState: IinitialState = {
    posts: [],
    tags: [],
    error: false,
    loading: true
}

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async () =>{
        const {data} = await axios.get(`posts`)
        return data
    }
)

export const getNewPosts = createAsyncThunk(
    'posts/getNewPosts',
    async () =>{
        const {data} = await axios.get(`posts/new`)
        return data
    }
)

export const getPopularPosts = createAsyncThunk(
    'posts/getPopularPosts',
    async () =>{
        const {data} = await axios.get(`posts/popular`)
        return data
    }
)

export const getUserPosts = createAsyncThunk(
    'posts/getUserPosts',
    async (id: string) =>{
        const {data} = await axios.get(`user/posts/${id}`)
        return data
    }
)

export const getPostsByTags = createAsyncThunk(
    'posts/getPostsByTags',
    async (tag: string) =>{
        const {data} = await axios.get(`posts/params/${tag}`)
        return data
    }
)

export const getTags = createAsyncThunk(
    'posts/getTags',
    async (count: number) =>{
        const {data} = await axios.get(`tags/${count}`)
        return data
    }
)



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        //----------------------------------------------------------
        builder.addCase(getAllPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
            state.loading = true
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            state.loading = false
        })
        builder.addCase(getAllPosts.rejected, (state, action) =>{
            state.error = true
        })
        //----------------------------------------------------------
        builder.addCase(getPostsByTags.pending, (state, action) =>{
            state.error = false
            state.posts = []
            state.loading = true
        })
        builder.addCase(getPostsByTags.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            state.loading = false
            state.loading = false
        })
        builder.addCase(getPostsByTags.rejected, (state, action) =>{
            state.error = true
        })
        //----------------------------------------------------------
        builder.addCase(getUserPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
            state.loading = true
        })
        builder.addCase(getUserPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            state.loading = false
        })
        builder.addCase(getUserPosts.rejected, (state, action) =>{
            state.error = true
        })
        //------------------------------------------------------------
        builder.addCase(getNewPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
            state.loading = true
        })
        builder.addCase(getNewPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            state.loading = false
        })
        builder.addCase(getNewPosts.rejected, (state, action) =>{
            state.error = true
        })
        //-----------------------------------------------------------
        builder.addCase(getPopularPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
            state.loading = true
        })
        builder.addCase(getPopularPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            state.loading = false
        })
        builder.addCase(getPopularPosts.rejected, (state, action) =>{
            state.error = true
        })
        //-------------------------------------------------------------
        builder.addCase(getTags.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getTags.fulfilled, (state, action) =>{
            state.tags = action.payload.tags
        })
        builder.addCase(getTags.rejected, (state, action) =>{
            state.error = true
        })
        //---------------------------------------------------------
    }
})


export default postSlice.reducer