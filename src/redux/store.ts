import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import kanbanSlice from '../features/kanban/slices/kanbanSlice';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  kanban: kanbanSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
