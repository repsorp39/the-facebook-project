import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAxiosInstance from "../../config/axios-config";

const initialState = {
  isLoading: false,
  chatPreview: [],
};

const fetchChat = createAsyncThunk(
  "fetch/discussions",
  async (friendid = "") => {
    try {
      const http = getAxiosInstance();
      const res = await http.get(
        `/messages/message.get.php?friend_id=${friendid}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Une erreur est survenue lors de l'exécution");
    }
  }
);

// const sendChat = createAsyncThunk('/send/message',async (message) =>{
//   const http = getAxiosInstance();
//   try {
//       await http.post("/messages/message.create.php",message);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const removeChat = createAsyncThunk('/remove/message',async (id) =>{
//   const http = getAxiosInstance();
//   try {
//       await http.delete(`/messages/message.create.php?id=${id}`);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const updateChat = createAsyncThunk('/remove/message',async (message) =>{
//   const http = getAxiosInstance();
//   try {
//       await http.post(`/messages/message.update.php`,message);
//   } catch (error) {
//     console.log(error);
//   }
// });

const discussionsReducer = createSlice({
  name: "discussions",
  initialState,
  reducers: {
    filterChat(state, { payload }) {
      console.log('filter');
      
      state.chatPreview = state.chatPreview.filter(
        (friend) =>
          friend.firstname.toLowerCase().includes(payload.toLowerCase()) ||
          friend.lastname.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatPreview = action.payload;
    });

    builder.addCase(fetchChat.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default discussionsReducer.reducer;
export const {  filterChat } = discussionsReducer.actions
export const isLoadingSelector = (state) => state.chat.isLoading;
export { fetchChat };
