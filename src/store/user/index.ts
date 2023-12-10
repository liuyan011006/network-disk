import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<any>) {
      state.useInfo = action.payload
    }
  }
})

export const USER_SLICE_NAME = userSlice.name

export const userReducer = userSlice.reducer

export const { setUserInfo } = userSlice.actions
