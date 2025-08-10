import { createSlice } from '@reduxjs/toolkit'

// ===================== API =====================


const initialState: {
    mode: string;
} = {
    mode: "light"
}

export const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeMode(state, action) {
            state.mode = action.payload;
        },

    },

})

export const { changeMode } = appSlice.actions;

export default appSlice.reducer;
