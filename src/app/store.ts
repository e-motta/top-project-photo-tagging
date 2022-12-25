import { configureStore } from '@reduxjs/toolkit';
import { levelsApi } from '../features/levels/levels-slice';
import { foundCharactersSlice } from '../features/levels/found-characters-slice';
import { guessButtonSlice } from '../features/levels/guess-button-slice';
import { timerSlice } from '../features/timer/timer-slice';
import { scoresApi } from '../features/scores/scores-slice';

export const store = configureStore({
  reducer: {
    [levelsApi.reducerPath]: levelsApi.reducer,
    [scoresApi.reducerPath]: scoresApi.reducer,
    foundCharacters: foundCharactersSlice.reducer,
    guessButton: guessButtonSlice.reducer,
    timer: timerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(levelsApi.middleware)
      .concat(scoresApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
