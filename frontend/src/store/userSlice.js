import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        add: (state, action) => {
            return action.payload
        },
        remove: (state) => {
            return null;
        }
    }
});


export const { add, remove } = userSlice.actions;
export default userSlice.reducer;