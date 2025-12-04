import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    library: [],
    nextId: 1,
  },
  reducers: {
    addImage: (state, action) => {
      const { name, base64, format, size, uploadDate } = action.payload;
      state.library.push({
        id: state.nextId,
        name,
        base64,
        format,
        size,
        uploadDate,
      });
      state.nextId += 1;
    },
    deleteImage: (state, action) => {
      const id = action.payload;
      state.library = state.library.filter(img => img.id !== id);
    },
    renameImage: (state, action) => {
      const { id, name } = action.payload;
      const image = state.library.find(img => img.id === id);
      if (image) {
        image.name = name;
      }
    },
    clearLibrary: (state) => {
      state.library = [];
      state.nextId = 1;
    },
    importLibrary: (state, action) => {
      const { library, nextId } = action.payload;
      state.library = library;
      state.nextId = nextId || (library.length > 0 ? Math.max(...library.map(img => img.id)) + 1 : 1);
    },
    loadLibraryFromLocalStorage: (state) => {
      const savedLibrary = localStorage.getItem('markdown-images');
      if (savedLibrary) {
        try {
          const data = JSON.parse(savedLibrary);
          state.library = data.library || [];
          state.nextId = data.nextId || (state.library.length > 0 ? Math.max(...state.library.map(img => img.id)) + 1 : 1);
        } catch (error) {
          console.error('Erreur lors du chargement de la bibliothèque d\'images:', error);
        }
      }
    },
  },
});

export const { addImage, deleteImage, renameImage, clearLibrary, importLibrary, loadLibraryFromLocalStorage } = imageSlice.actions;
export default imageSlice.reducer;
