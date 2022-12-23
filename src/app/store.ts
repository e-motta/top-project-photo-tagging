import { configureStore } from '@reduxjs/toolkit';
import { levelsApi } from '../features/levels/levels-slice';
import { foundCharactersSlice } from '../features/levels/found-characters-slice';
import { guessButtonSlice } from '../features/levels/guess-button-slice';

export const store = configureStore({
  reducer: {
    [levelsApi.reducerPath]: levelsApi.reducer,
    foundCharacters: foundCharactersSlice.reducer,
    guessButton: guessButtonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(levelsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
