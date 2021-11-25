import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../../API/userApi";
import { TOKEN, USER } from "../../constants";

export const register = createAsyncThunk("user/register", async (payload) => {
  // 1-- Call API to Register
  const data = await UserAPI.register(payload);

  // 2-- Save data to local storage
  localStorage.setItem(TOKEN, data.jwt);
  localStorage.setItem(USER, JSON.stringify(data.user));

  // 3-- return user data
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // 1-- Call API to Register
  const data = await UserAPI.login(payload);

  // 2-- Save data to local storage
  localStorage.setItem(TOKEN, data.jwt);
  localStorage.setItem(USER, JSON.stringify(data.user));

  // 3-- return user data
  return data.user;
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(USER)) || {},
    settings: {},
  },
  reducers: {
    logOut(state) {
      // Clear LocalStorage
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);

      // Set lại state là object rỗng
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    // [register.fulfilled]: (state, action) => {
    //   state.current = action.payload;
    // },

    // [login.fulfilled]: (state, action) => {
    //   state.current = action.payload;
    // },
  },
});

const { actions, reducer } = UserSlice;
export const { logOut } = actions;
export default reducer;
