import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean,
  username: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: ""
}

export const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<string>) => {
      return {
        isLoggedIn: true,
        username: action.payload
      }
    },
    logOut: () => {
      return initialState
    }
  }
})

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;