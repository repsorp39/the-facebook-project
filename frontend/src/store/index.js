import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user-slice";
import postReducer from "./features/posts-slice";
import friendsReducer from "./features/friends-slice";
import discussionsReducer from "./features/discussions-slice";

const store = configureStore({
  reducer:{
    auth:authReducer,
    posts:postReducer,
    friends:friendsReducer,
    chat:discussionsReducer
  }
})

export default store;