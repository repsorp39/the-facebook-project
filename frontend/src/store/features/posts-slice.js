import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import getAxiosInstance from "../../config/axios-config";

const initialState = { 
  posts:[],
  isFetching:false,
  errorMessage:""
 };

const fetchPosts = createAsyncThunk("posts/fetch/",async (postid = "")=>{
 try {
    const http = getAxiosInstance();
    const res = await http.get(`/articles/article.get.php/?id=${postid}`);
    return res.data;
 } catch (error) {
    throw new Error(error.response.data.message);
 }
});



const postsReducer = createSlice({
  name:"posts",
  initialState,
  reducers:{
    delete(state,{payload}){
      state.posts = state.posts.filter((p) => p.post_id !== payload)
    },

    update(state,{ payload }){
      const index = state.posts.findIndex((post) => post.post_id === payload.post_id);
      state.posts[index] = payload;
    },

    like(state,{ payload }){
      const index = state.posts.findIndex((post) => post.post_id === payload.post_id);
      state.posts[index].likes.push(payload.userid);
    },

    dislike(state,{ payload }){
      const index = state.posts.findIndex((post) => post.post_id === payload.post_id);
      state.posts[index].likes = state.posts[index].likes.filter((id) => id !== payload.userid );
    },

    setPosts(state, { payload }){
      state.posts = payload;
    }

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchPosts.pending,(state,action) =>{
      state.isFetching = true;
    })
    builder.addCase(fetchPosts.fulfilled,(state,action) =>{
      state.posts = action.payload;
      state.isFetching = false;
    })
    builder.addCase(fetchPosts.rejected,(state,action) =>{
      state.errorMessage = action.error.message;
      state.isFetching = false;
    })
  }
});

export default postsReducer.reducer;
export const deletePost = postsReducer.actions.delete;
export const updatePost = postsReducer.actions.update;
export const setPosts= postsReducer.actions.setPosts;
export const likePost = postsReducer.actions.like;
export const dislikePost = postsReducer.actions.dislike;
export { fetchPosts };