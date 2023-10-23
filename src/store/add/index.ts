import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAddState } from "./initialState";

const addSlice = createSlice({
    name: "add",
    initialState: initialAddState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            state.num += action.payload
        }
    }
})

export const ADD_SLICE_NAME = addSlice.name;

export const addReducer = addSlice.reducer;

export const { add } = addSlice.actions;