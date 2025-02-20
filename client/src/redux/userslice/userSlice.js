import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    // login process
    // loginStart: (state) => {
    //   state.isFetching = true;
    //   state.error = null;
    // },
    // loginSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.currentUser = action.payload;
    //   state.error = null;
    // },
    // loginFailure: (state) => {
    //   state.isFetching = false;
    //    state.error = action.payload;
    // },
    loginStart: (state) => {
      state.isFetching = true;
      state.error = null; // Reset error on new login attempt
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      // ✅ Make sure action is defined
      state.isFetching = false;
      state.error = action.payload; // Store the error message
    },
    // logout process
    // logoutStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // logoutSuccess: (state) => {
    //   state.isFetching = false;
    //   state.currentUser = null;
    //   state.error = false;
    // },
    // logoutFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },

    //
    registerStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    //

    logoutStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null; // Clear user data
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload; // Store error message if logout fails
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
