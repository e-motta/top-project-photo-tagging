import { configureStore } from '@reduxjs/toolkit';
import { foundCharactersSlice } from '../features/levels/slices/foundCharactersSlice';
import { guessButtonSlice } from '../features/levels/slices/guessButtonSlice';
import { timerSlice } from '../features/timer/timerSlice';
import { firestoreApi } from './firestoreApi';

export const setupStore = () =>
  configureStore({
    reducer: {
      [firestoreApi.reducerPath]: firestoreApi.reducer,
      foundCharacters: foundCharactersSlice.reducer,
      guessButton: guessButtonSlice.reducer,
      timer: timerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(firestoreApi.middleware);
    },
  });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
