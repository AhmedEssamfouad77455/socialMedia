import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { PostApi } from  './Posts'

export const Store = configureStore({
  reducer: {
    [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostApi.middleware),
})

setupListeners(Store.dispatch)