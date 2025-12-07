import { createSlice } from '@reduxjs/toolkit';

// Default shortcuts
const DEFAULT_SHORTCUTS = [
    {id: 1, name: "Bold",       content: "****",    type: 'ks-file',   shortcut: 'Ctrl+B', parentID: 'null'},
    {id: 2, name: "Italic",     content: "**",      type: 'ks-file',   shortcut: 'Ctrl+I', parentID: 'null'},
    {id: 3, name: "Title 1",    content: "# ",      type: 'ks-file',   shortcut: 'Ctrl+1', parentID: 'null'}
];

// Helper function to load shortcuts from localStorage
const loadShortcutsFromStorage = () => {
    const saved_shortcuts = localStorage.getItem('keyboard-shortcuts');
    return [
        ...DEFAULT_SHORTCUTS,
        ...(saved_shortcuts ? JSON.parse(saved_shortcuts) : [])
    ];
};

const initialState = {
    shortcuts: loadShortcutsFromStorage(),
    activeShortcutId: 1,
    showDialog: false,
    dialogMode: 'add'
};

const shortcutsSlice = createSlice({
    name: 'shortcuts',
    initialState,
    reducers: {
        // Set active shortcut
        setActiveShortcutId: (state, action) => {
            state.activeShortcutId = action.payload;
        },

        // Add new shortcut
        addShortcut: (state, action) => {
            const newId = Math.max(...state.shortcuts.map(s => s.id), 0) + 1;
            const newShortcut = {
                id: newId,
                name: action.payload.name,
                content: '',
                type: 'file',
                shortcut: action.payload.shortcut,
                parentID: 'null'
            };
            state.shortcuts.push(newShortcut);
            state.showDialog = false;
            // Save to localStorage (excluding default shortcuts)
            saveShortcutsToStorage(state.shortcuts);
        },

        // Update shortcut
        updateShortcut: (state, action) => {
            const shortcutToUpdate = state.shortcuts.find(s => s.id === state.activeShortcutId);
            if(shortcutToUpdate){
                shortcutToUpdate.name = action.payload.name;
                shortcutToUpdate.shortcut = action.payload.shortcut;
                state.showDialog = false;
                // Save to localStorage
                saveShortcutsToStorage(state.shortcuts);
            }
        },

        // Modify shortcut content
        modifyShortcutContent: (state, action) => {
            const shortcutToModify = state.shortcuts.find(s => s.id === state.activeShortcutId);
            if(shortcutToModify){
                shortcutToModify.content = action.payload;
                // Save to localStorage
                saveShortcutsToStorage(state.shortcuts);
            }
        },

        // Delete shortcut
        deleteShortcut: (state, action) => {
            state.shortcuts = state.shortcuts.filter(s => s.id !== action.payload);
            if(state.activeShortcutId === action.payload){
                state.activeShortcutId = 1; // Reset to first shortcut
            }
            // Save to localStorage
            saveShortcutsToStorage(state.shortcuts);
        },

        // Open dialog for adding
        openAddDialog: (state) => {
            state.showDialog = true;
            state.dialogMode = 'add';
        },

        // Open dialog for editing
        openEditDialog: (state) => {
            state.showDialog = true;
            state.dialogMode = 'edit';
        },

        // Close dialog
        closeDialog: (state) => {
            state.showDialog = false;
        }
    }
});

// Helper function to save shortcuts to localStorage (excluding default shortcuts)
const saveShortcutsToStorage = (shortcuts) => {
    const userShortcuts = shortcuts.slice(DEFAULT_SHORTCUTS.length);
    localStorage.setItem('keyboard-shortcuts', JSON.stringify(userShortcuts));
};

export const {
    setActiveShortcutId,
    addShortcut,
    updateShortcut,
    modifyShortcutContent,
    deleteShortcut,
    openAddDialog,
    openEditDialog,
    closeDialog
} = shortcutsSlice.actions;

export default shortcutsSlice.reducer;