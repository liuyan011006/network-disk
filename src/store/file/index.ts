import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileSelectedRowKeys(state, action: PayloadAction<React.Key[]>) {
      state.fileSelectedRowKeys = action.payload
    },
    setRecycleSelectedRowKeys(state, action: PayloadAction<React.Key[]>) {
      state.recycleSelectedRowKeys = action.payload
    }
  }
})

export const FILE_SLICE_NAME = fileSlice.name

export const fileReducer = fileSlice.reducer

export const { setFileSelectedRowKeys, setRecycleSelectedRowKeys } =
  fileSlice.actions
