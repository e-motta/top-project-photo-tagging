import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orientation } from '../../../types';

const guessButtonInitialState = {
  showGuessButton: false,
  guessButtonOrientation: 'X' as Orientation,
  reverseXGuessButton: false,
  reverseYGuessButton: false,
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
    setGuessButtonOrientation(state, action: PayloadAction<Orientation>) {
      state.guessButtonOrientation = action.payload;
    },
    setReverseXGuessButton(state, action: PayloadAction<boolean>) {
      state.reverseXGuessButton = action.payload;
    },
    setReverseYGuessButton(state, action: PayloadAction<boolean>) {
      state.reverseYGuessButton = action.payload;
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
  setGuessButtonOrientation,
  setReverseXGuessButton,
  setReverseYGuessButton,
  setGuessButtonStyle,
  setSelectedCharacterId,
} = guessButtonSlice.actions;
