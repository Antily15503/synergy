import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({ //exporting a default store
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware)
});