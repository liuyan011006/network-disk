import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        setIsFileDataUpdate(state, action: PayloadAction<boolean>) {
            state.isfileDataUpdate = action.payload
        }
    }
})

export const FILE_SLICE_NAME = fileSlice.name;

export const fileReducer = fileSlice.reducer;

export const { setIsFileDataUpdate } = fileSlice.actions;