// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Create the Redux store and disable the serializable check for middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions containing these field paths
        ignoredActions: ['SET_SOCKET'],
        // Ignore these paths in the state
        ignoredPaths: ['socket'],
      },
    }),
});
