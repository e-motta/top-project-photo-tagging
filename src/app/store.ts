import { configureStore } from '@reduxjs/toolkit';
import { levelsApi } from '../features/levels/slices/levels-slice';
import { scoresApi } from '../features/scores/scores-slice';
import { foundCharactersSlice } from '../features/levels/slices/found-characters-slice';
import { guessButtonSlice } from '../features/levels/slices/guess-button-slice';
import { timerSlice } from '../features/timer/timer-slice';

export const setupStore = () =>
  configureStore({
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

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
