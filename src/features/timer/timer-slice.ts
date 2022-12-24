import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Timer {
  start: number;
  stop: number | null;
}

const timerInitialState: Timer = {
  start: new Date().getTime(),
  stop: null,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: timerInitialState,
  reducers: {
    stoptimer(state) {
      state.stop = new Date().getTime();
    },
    resetTimer(state) {
      state.start = new Date().getTime();
      state.stop = null;
    },
  },
});

export const { stoptimer, resetTimer } = timerSlice.actions;
