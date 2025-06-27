import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import getAxiosInstance from "../../config/axios-config";

const initialState = {
  friends:[],
  friendsRequest:[],
  friendsSuggestions:[],
  loading:false
};



const fetchFriends = createAsyncThunk("fetch/friends",async ()=>{
  const http = getAxiosInstance();
  try {
    const res = await http.get("/friendship/friendship-get-all.php/");
    return res.data;
  } catch (err) {
      console.log(err);   
  }
});

const fetchFriendsRequest = createAsyncThunk("fetch/friendsRequest",async ()=>{
  const http = getAxiosInstance();
  try {
    const res = await http.get("/friendship/friendship-waiting-request.php");
    return res.data;
  } catch (err) {
      console.log(err);   
  }
});

const fetchFriendsSuggestions = createAsyncThunk("fetch/friendSuggestions",async ()=>{
  const http = getAxiosInstance();
  try {
    const res = await http.get("/friendship/friendship-list-can-send.php")
    return res.data;
  } catch (err) {
      console.log(err);   
  }
});

const friendReducer = createSlice({
  name:"friends",
  initialState,
  reducers:{
    sendRequest(state,payload){
      state.friendsSuggestions = state.friendsSuggestions.filter((f) => f.id !== payload);
    },
    removeRequest(state,{payload}){
      state.friendsRequest = state.friendsRequest.filter((f) => f.id !== payload);
    },
    removeSuggestions(state,{payload}){   
      state.friendsSuggestions = state.friendsSuggestions.filter((f) => f.id !== payload);
    },
    removeFriend(state,{payload}){
      state.friends = state.friends.filter((f) => f.id !== payload);
    },
    confirmFriend(state,{payload}){
      state.friendsRequest = state.friendsRequest.filter((f) => f.id !== payload);
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchFriends.fulfilled,(state,{ payload }) =>{
      state.friends = payload;
    });

    builder.addCase(fetchFriendsRequest.fulfilled,(state,{ payload }) =>{
      state.friendsRequest = payload;
    });

    builder.addCase(fetchFriendsSuggestions.fulfilled,(state,{ payload }) =>{
      state.friendsSuggestions = payload;
    });

  }
});

export const friendsSelector = (state) => state.friends.friends;
export const friendsReqSelector = (state) => state.friends.friendsRequest;
export const friendsSuggestionsSelector = (state) => state.friends.friendsSuggestions;
export const { 
  removeSuggestions,
  removeFriend,
  removeRequest,
  confirmFriend
} = friendReducer.actions;
export { 
  fetchFriendsSuggestions,
  fetchFriends,
  fetchFriendsRequest 
};
export default friendReducer.reducer;

