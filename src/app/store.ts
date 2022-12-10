import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
    // .concat(apiSlice.middleware)
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
