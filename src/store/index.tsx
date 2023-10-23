import { configureStore } from '@reduxjs/toolkit'
import { ADD_SLICE_NAME, addReducer } from './add'

export const store = configureStore({
  reducer: {
    [ADD_SLICE_NAME]: addReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
