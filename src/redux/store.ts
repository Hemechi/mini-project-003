import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter/counterSlice'
import cartSlice from './features/cart/cartSlice'
import userProfileSlice from './features/userProfile/userProfileSlice'
import authSlice from './features/auth/authSlice'
import { productApi } from './service/product'
// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [productApi.reducerPath]: productApi.reducer,
      counter: counterSlice,
      cart: cartSlice,
      userProfile: userProfileSlice,
      auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),

  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']