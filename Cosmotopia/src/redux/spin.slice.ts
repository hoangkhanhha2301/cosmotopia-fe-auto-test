import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isSpin: false
};
const spinSlice = createSlice({
  name: 'spin',
  initialState,
  reducers: {
    turnOffSpin: (state) => {
      state.isSpin = false;
    },
    turnOnSpin: (state) => {
      state.isSpin = true;
    }
  }
});

export const { turnOffSpin, turnOnSpin } = spinSlice.actions;
const spinReducer = spinSlice.reducer;
export default spinReducer;
