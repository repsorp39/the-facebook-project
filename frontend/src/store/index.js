import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user-slice";
import postReducer from "./features/posts-slice";
import friendsReducer from "./features/friends-slice";

const store = configureStore({
  reducer:{
    auth:authReducer,
    posts:postReducer,
    friends:friendsReducer
  }
})

export default store;