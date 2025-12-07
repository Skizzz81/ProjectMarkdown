import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
  name: 'blocks',
  initialState: {
    library: [],
    nextId: 1,
  },
  reducers: {
    addBlock: (state, action) => {
      const { name, content } = action.payload;
      state.library.push({
        id: state.nextId,
        name,
        content,
        createdDate: new Date().toISOString(),
      });
      state.nextId += 1;
    },
    deleteBlock: (state, action) => {
      const id = action.payload;
      state.library = state.library.filter(block => block.id !== id);
    },
    updateBlock: (state, action) => {
      const { id, updates } = action.payload;
      const block = state.library.find(b => b.id === id);
      if (block) {
        if (updates.name !== undefined) block.name = updates.name;
        if (updates.content !== undefined) block.content = updates.content;
      }
    },
    clearLibrary: (state) => {
      state.library = [];
      state.nextId = 1;
    },
    importLibrary: (state, action) => {
      const importedBlocks = action.payload;
      
      // Ajouter les blocs importés à ceux existants
      importedBlocks.forEach(importedBlock => {
        state.library.push({
          ...importedBlock,
          id: state.nextId
        });
        state.nextId += 1;
      });
    },
    loadLibraryFromLocalStorage: (state) => {
      const savedLibrary = localStorage.getItem('markdown-blocks');
      if (savedLibrary) {
        try {
          const data = JSON.parse(savedLibrary);
          state.library = data.library || [];
          state.nextId = data.nextId || (state.library.length > 0 ? Math.max(...state.library.map(b => b.id)) + 1 : 1);
        } catch (error) {
          console.error('Erreur lors du chargement de la bibliothèque de blocs:', error);
        }
      }
    },
  },
});

export const { addBlock, deleteBlock, updateBlock, clearLibrary, importLibrary, loadLibraryFromLocalStorage } = blockSlice.actions;
export default blockSlice.reducer;
