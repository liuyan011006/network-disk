import { configureStore } from '@reduxjs/toolkit'
import { BREADCRUMB_SLICE_NAME, breadcrumbReducer } from './breadcrumb'

export const store = configureStore({
  reducer: {
    [BREADCRUMB_SLICE_NAME]: breadcrumbReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
