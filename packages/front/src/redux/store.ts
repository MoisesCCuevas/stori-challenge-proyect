import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainSlice';
import type { PreloadedState } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  main: mainReducer
})

const storeTest = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  })
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export type StateType = ReturnType<typeof store.getState>
export type DispachType = typeof store.dispatch

export type AppStore = ReturnType<typeof storeTest>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>

export default store;
