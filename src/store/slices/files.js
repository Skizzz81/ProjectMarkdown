import { createSlice } from '@reduxjs/toolkit';

// Fonction pour charger les fichiers depuis localStorage
const loadFilesFromStorage = () => {
    const saved = localStorage.getItem('markdown-files');
    if (saved) {
        return JSON.parse(saved);
    } else {
        // données par défaut 
        return [
            { id: 1, name: 'Projets', type: 'folder', parentId: null },
            { id: 2, name: 'Personnel', type: 'folder', parentId: null },
            { id: 3, name: 'notes.md', type: 'file', content: '# Mes Notes', parentId: null },
            { id: 4, name: 'todo.md', type: 'file', content: '# Todo List', parentId: null },
            { id: 5, name: 'ideas.md', type: 'file', content: '# Idées', parentId: null },
            { id: 6, name: 'projet1.md', type: 'file', content: '# Projet 1', parentId: 1 },
            { id: 7, name: 'projet2.md', type: 'file', content: '# Projet 2', parentId: 1 },
            { id: 8, name: 'journal.md', type: 'file', content: '# Journal Personnel.', parentId: 2 },
            { id: 9, name: 'Vacances', type: 'folder', parentId: 2 },
            { id: 10, name: '2024.md', type: 'file', content: '# Vacances 2024', parentId: 9 },
            { id: 11, name: '2025.md', type: 'file', content: '# Vacances 2025', parentId: 9 }
        ];

    }
};

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        list: loadFilesFromStorage(),
        activeFileId: 3,
        openFolders: [],
        nextId: 12 
    },
    reducers: {

        // changer le fichier actif 
        setActiveFile: (state, action) => {
            const { payload } = action;
            state.activeFileId = payload;
        },


        // modifier le contenu du fichier 
        updateFileContent: (state, action) => {
            const { payload } = action;
            const { id, content } = payload;
            const file = state.list.find(f => f.id === id);
            if (file) {
                file.content = content;
            }
        },

        // ouvrir/fermer un dossier
        toggleFolder: (state, action) => {
            const { payload } = action;
            const folderId = payload;
            if (state.openFolders.includes(folderId)) {
                state.openFolders = state.openFolders.filter(id => id !== folderId);
            } else {
                state.openFolders.push(folderId);
            }
        },

// Ajouter un nouveau fichier
        addFile: (state, { payload }) => {
            const { name, parentId, content } = payload;
            state.list.push({
                id: state.nextId,
                name: name,
                type: 'file',
                content: content || '',
                parentId: parentId || null  
            });
            state.nextId++; 
        },

        // Ajouter nouveau dossier 
           addFolder: (state, { payload }) => {
            const { name, parentId } = payload;
            state.list.push({
                id: state.nextId,
                name: name,
                type: 'folder',
                parentId: parentId || null  
            });
            state.nextId++; 
        },
    }
});


export { filesSlice };
export const { setActiveFile, updateFileContent, toggleFolder, addFile, addFolder } = filesSlice.actions;
export default filesSlice.reducer;
