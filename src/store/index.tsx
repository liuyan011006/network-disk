import { configureStore } from '@reduxjs/toolkit'
import { BREADCRUMB_SLICE_NAME, breadcrumbReducer } from './breadcrumb'
import { FILE_SLICE_NAME, fileReducer } from './file'

export const store = configureStore({
  reducer: {
    [BREADCRUMB_SLICE_NAME]: breadcrumbReducer,
    [FILE_SLICE_NAME]: fileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
