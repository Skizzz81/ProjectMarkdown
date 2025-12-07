import { configureStore } from '@reduxjs/toolkit';
import filesReducer       from './slices/files';
import imageReducer       from './slices/images';
import shortcutsReducer   from './slices/shortcuts';
import blockReducer       from './slices/blocks';

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
  
  // Sauvegarder les blocs après chaque action
  if (action.type?.startsWith('blocks/')) {
    const state = store.getState().blocks;
    localStorage.setItem('markdown-blocks', JSON.stringify({
      library: state.library,
      nextId: state.nextId,
    }));
  }
  
  return result;
};

const store = configureStore({
  reducer: {
    files:      filesReducer,
    images:     imageReducer,
    shortcuts:  shortcutsReducer,
    blocks:     blockReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export default store;