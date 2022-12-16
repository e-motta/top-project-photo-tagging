import { configureStore } from '@reduxjs/toolkit';
import { levelsApiSlice } from '../features/levels/levels-slice';

export const store = configureStore({
  reducer: {
    [levelsApiSlice.reducerPath]: levelsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(levelsApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
