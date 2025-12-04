import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './slices/files';
import imageReducer from './slices/images';

// Middleware pour sauvegarder automatiquement dans localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Sauvegarder les images après chaque action
  if (action.type?.startsWith('images/')) {
    const state = store.getState().images;
    localStorage.setItem('markdown-images', JSON.stringify({
      library: state.library,
      nextId: state.nextId,
    }));
  }
  
  return result;
};

const store = configureStore({
  reducer: {
    files: filesReducer,
    images: imageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export default store;
