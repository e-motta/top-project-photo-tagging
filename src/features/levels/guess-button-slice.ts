import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const guessButtonInitialState = {
  showGuessButton: false,
  reverseGuessButton: true,
  scaleGuessButton: false,
  guessButtonStyle: {
    left: '-9999px',
    top: '-9999px',
  } as React.CSSProperties,
  selectedCharacterId: null as string | null,
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
    setGuessButtonStyle(state, action: PayloadAction<React.CSSProperties>) {
      state.guessButtonStyle = action.payload;
    },
    setSelectedCharacterId(state, action: PayloadAction<string | null>) {
      state.selectedCharacterId = action.payload;
    },
  },
});

export const {
  setShowGuessButton,
  setReverseGuessButton,
  setGuessButtonStyle,
  setSelectedCharacterId,
} = guessButtonSlice.actions;
