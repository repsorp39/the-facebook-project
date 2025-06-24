import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  isLoggedIn:false,
  token:"",
  userinfo:{},
  isLoading:false,
  isRegistering:false,
  registerErrorMessage:'',
  isLoggingState:false,
  loginErrorMessage:''
}

const fetchUser =  createAsyncThunk("/user/info",async ()=>{
  try {
    //erase the default axios config 
    const { data:user }= await axios.get("/users/user.get.php", {
      headers:{ 
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    });
    return {
      userid:user.id,
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      gender:user.gender,
      birthday:user.birthday,
      picture:user.picture,
      role:user.role

    };
  } catch (error) {
    throw new Error (error.response.data.message);
  }

});

const loginUser = createAsyncThunk("/user/login",async(credentials,thunk) => {
  try {
    const { data } = await axios.post("/users/user.login.php",credentials);
    localStorage.setItem("token",data.token);
    await thunk.dispatch(fetchUser(credentials)).unwrap();
    return data.token;
  } catch (error) {
      throw new Error (error.response.data.message);
  }
})

const registerUser = createAsyncThunk("/user/register",async (credentials,thunk)=>{
  try {
    await axios.post("/users/user.create.php",credentials);
  } catch (error) {
      throw new Error(error.response.data.message);
  }
  thunk.dispatch(loginUser(credentials));
})

const logoutUser = createAsyncThunk("/user/logout",async ()=>{
  try {
    await axios.delete("/users/user.logout.php");
    localStorage.setItem("token","");
  } catch (error) {
      throw new Error(error.response.data.message);
  }
});


const userReducer= createSlice({
  name:"user",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    //fetching user
    builder.addCase(fetchUser.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(fetchUser.fulfilled,(state,action)=>{
      state.isLoggedIn = true;
      state.isLoading = false;
      state.userinfo = action.payload;
    })

    builder.addCase(fetchUser.rejected,(state,action)=>{
      state.isLoggedIn = false;
      state.isLoading = false;
    })

    //logging 
    builder.addCase(loginUser.pending,(state,action)=>{
      state.isLoggingState = true;
    })

    builder.addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoggingState = false;
      state.isLoggedIn = true;
      state.token = action.payload;    
    })

    builder.addCase(loginUser.rejected,(state,action)=>{
      state.isLoggingState = false;
      state.loginErrorMessage = action.error.message;
    });

    //register user
    builder.addCase(registerUser.pending,(state,action)=>{
      state.isRegistering = true;
    })

    builder.addCase(registerUser.fulfilled,(state,action)=>{
      state.isRegistering = false;
    })

    builder.addCase(registerUser.rejected,(state,action)=>{
      state.isRegistering = false;
      state.registerErrorMessage = action.error.message;
    })

    builder.addCase(logoutUser.fulfilled,(state) =>{
      state.isLoggedIn = false;
    })
  }
})

export const isLoggingState = (state) => state.auth.isLoggingState;
export const loginErrorMessage = (state) => state.auth.loginErrorMessage;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const registerError = (state) => state.auth.registerErrorMessage;
export const isRegisteringSelector = (state) => state.auth.isRegistering;
export {
  fetchUser,
  registerUser,
  loginUser,
  logoutUser
};
export default userReducer.reducer;