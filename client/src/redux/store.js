import authReducer from './reducers/authReducer';
import donationReducer from './reducers/donationReducer';
import uiReducer from './reducers/uiReducer';
import collegeReducer from './reducers/collegeReducer'
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import profileReducer from './reducers/profileReducer';
import BanksReducer from './reducers/bankReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
}

export const rootReducers = combineReducers({
  auth: authReducer,
  donations: donationReducer,
  ui: uiReducer,
  college: collegeReducer,
  profile: profileReducer,
  bank: BanksReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

setupListeners(store.dispatch);

