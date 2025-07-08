import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import getAxiosInstance from "../../config/axios-config";

const initialState = {
  friends:[],
  friendsRequest:[],
  friendsSuggestions:[],
  isFetchingSuggestion:false,
  isFetchingList:false,
  isFetchingReq:false,
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
    //lists
    builder.addCase(fetchFriends.pending,(state,{ payload }) =>{
      state.isFetchingList = true;
    });
    builder.addCase(fetchFriends.fulfilled,(state,{ payload }) =>{
      state.friends = payload;
      state.isFetchingList = false;
    });
    builder.addCase(fetchFriends.rejected,(state,{ payload }) =>{
      state.isFetchingList = false;
    });

    //requetes
    builder.addCase(fetchFriendsRequest.pending,(state,{ payload }) =>{
      state.isFetchingReq = true;
    });
    builder.addCase(fetchFriendsRequest.fulfilled,(state,{ payload }) =>{
      state.friendsRequest = payload;
      state.isFetchingReq = false;
    });
    builder.addCase(fetchFriendsRequest.rejected,(state,{ payload }) =>{
      state.isFetchingReq = false;
    });

    //suggestions
    builder.addCase(fetchFriendsSuggestions.pending,(state,{ payload }) =>{
      state.isFetchingSuggestion = true;
    });
    builder.addCase(fetchFriendsSuggestions.fulfilled,(state,{ payload }) =>{
      state.friendsSuggestions = payload;
      state.isFetchingSuggestion = false;
    });
    builder.addCase(fetchFriendsSuggestions.rejected,(state,{ payload }) =>{
      state.isFetchingSuggestion = false;
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

