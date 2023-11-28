import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedRowKeys(state, action: PayloadAction<React.Key[]>) {
      state.selectedRowKeys = action.payload
    }
  }
})

export const FILE_SLICE_NAME = fileSlice.name

export const fileReducer = fileSlice.reducer

export const { setSelectedRowKeys } = fileSlice.actions
