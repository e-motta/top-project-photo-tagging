import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoundCharacter, FoundCharacters } from '../../types';

const foundCharactersInitialState: FoundCharacters = [
  { id: '15hg3If0JJaa3gXzfpow', found: false },
  { id: '8LhDob2HJEjB5Gvi7s2u', found: false },
  { id: 'tWH93mZU0sfqsPYC4ART', found: false },
  { id: 'xvke58nGthigfxFfvOTp', found: false },
];

export const foundCharactersSlice = createSlice({
  name: 'foundCharacters',
  initialState: foundCharactersInitialState,
  reducers: {
    resetScore() {
      return foundCharactersInitialState;
    },
    setFoundCharacter(state, action: PayloadAction<string>) {
      const id = action.payload;
      const character = state.find((char: FoundCharacter) => char.id === id);
      if (character) character.found = true;
    },
  },
});

export const { resetScore, setFoundCharacter } = foundCharactersSlice.actions;
