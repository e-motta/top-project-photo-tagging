import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const guessButtonInitialState = {
  showGuessButton: false,
  reverseGuessButton: true,
  scaleGuessButton: false,
  guessButtonStyle: {
    left: '-9999px',
    top: '-9999px',
  } as React.CSSProperties,
};

export const guessButtonSlice = createSlice({
  name: 'guessButton',
  initialState: guessButtonInitialState,
  reducers: {
    setShowGuessButton(state, action: PayloadAction<boolean>) {
      state.showGuessButton = action.payload;
    },
    setReverseGuessButton(state, action: PayloadAction<boolean>) {
      state.reverseGuessButton = action.payload;
    },
    setScaleGuessButton(state, action: PayloadAction<boolean>) {
      state.scaleGuessButton = action.payload;
    },
    setGuessButtonStyle(state, action: PayloadAction<React.CSSProperties>) {
      state.guessButtonStyle = action.payload;
    },
  },
});

export const {
  setShowGuessButton,
  setReverseGuessButton,
  setScaleGuessButton,
  setGuessButtonStyle,
} = guessButtonSlice.actions;
