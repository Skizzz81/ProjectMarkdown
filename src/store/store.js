import { configureStore } from '@reduxjs/toolkit';
import filesSlice from './slices/files';

const store = configureStore({
    reducer: {
        files: filesSlice
    }
});

export default store;
