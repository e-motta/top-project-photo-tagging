import { configureStore } from '@reduxjs/toolkit';
import {
  levelsApi,
  foundCharactersSlice,
} from '../features/levels/levels-slice';

export const store = configureStore({
  reducer: {
    foundCharacters: foundCharactersSlice.reducer,
    [levelsApi.reducerPath]: levelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(levelsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
