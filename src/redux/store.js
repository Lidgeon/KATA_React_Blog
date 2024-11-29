import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './slices/articlesSlice'
import authSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    articlesReducer: articlesSlice,
    authReducer: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
