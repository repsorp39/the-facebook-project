import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = { 
  posts:[],
  isFetching:false,
  errorMessage:""
 };

const fetchPosts = createAsyncThunk("posts/fetch/",async (postid = "")=>{
 try {
    const res = await axios.get(`/articles/article.get.php/?id=${postid}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    return res.data;
 } catch (error) {
    throw new Error(error.response.data.message);
 }
});


// const updatePosts = createAsyncThunk("posts/update/", async (post) =>{
//   try {
//     const res = await axios.post("/articles/article.update.php",post);
//     return res.data;
//  } catch (error) {
//     throw new Error(error.response.data.message);
//  }
// });

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
    }
  },
  extraReducers:(builder)=>{
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
export { fetchPosts };