import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, IBreadcrumbItem } from "./initialState";

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        addBreadcrumbItem: (state, action: PayloadAction<IBreadcrumbItem>) => {
            const index = state.items.findIndex(item => item.title === action.payload.title)
            if (index > -1) {
                state.items = state.items.slice(0, index + 1)
            } else {
                state.items = [...state.items, action.payload]
            }
        }
    }
})

export const BREADCRUMB_SLICE_NAME = breadcrumbSlice.name;

export const breadcrumbReducer = breadcrumbSlice.reducer;

export const { addBreadcrumbItem } = breadcrumbSlice.actions;