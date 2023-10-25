import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, IBreadcrumbItem } from "./initialState";

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        addBreadcrumbItem: (state, action: PayloadAction<IBreadcrumbItem>) => {
            if (!state.items.some(item => item.title === action.payload.title)) {
                state.items = [...state.items, action.payload]
                sessionStorage.setItem("breadcrumb", JSON.stringify(state.items))
            }
        },
        deleteBreadcrumbItems(state, action: PayloadAction<string>) {
            const index = state.items.findIndex(item => item.key === action.payload)
            if (index > -1) {
                state.items = state.items.slice(0, index + 1)
                sessionStorage.setItem("breadcrumb", JSON.stringify(state.items))
            }
        }
    }
})

export const BREADCRUMB_SLICE_NAME = breadcrumbSlice.name;

export const breadcrumbReducer = breadcrumbSlice.reducer;

export const { addBreadcrumbItem, deleteBreadcrumbItems } = breadcrumbSlice.actions;