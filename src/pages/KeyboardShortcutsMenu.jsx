import { useDispatch, useSelector } from 'react-redux';
import ShortcutTree                 from '../components/Sidebar/ShortcutTree';
import NavBar                       from '../components/NavBar/NavBar';
import MarkdownEditor               from '../components/Editor/MarkdownEditor';
import MarkdownPreview              from '../components/Editor/MarkdownPreview';
import KeyboardShortcutInput        from '../components/Editor/KeyboardShortcutInput';
import {
    setActiveShortcutId,
    modifyShortcutContent,
    openEditDialog,
    closeDialog,
    addShortcut,
    updateShortcut
} from '../store/slices/shortcuts';

export default function KeyboardShortcutsMenu(){
    const dispatch = useDispatch();

    // Get state from Redux
    const shortcuts         = useSelector(state => state.shortcuts.shortcuts);
    const activeShortcutId  = useSelector(state => state.shortcuts.activeShortcutId);
    const showDialog        = useSelector(state => state.shortcuts.showDialog);
    const dialogMode        = useSelector(state => state.shortcuts.dialogMode);

    // Find active shortcut
    const active_shortcut   = shortcuts.find(file => file.id === activeShortcutId);

    // Check if it's a default shortcut
    const isDefaultShortcut = activeShortcutId <= 3;

    // Handle shortcut content modification
    const handleModifyShortcut = (newContent) => {
        dispatch(modifyShortcutContent(newContent));
    };

    // Handle dialog close
    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };

    // Handle adding/updating shortcut
    const handleSaveShortcut = (shortcutData) => {
        if (dialogMode === 'add') {
            dispatch(addShortcut(shortcutData));
        } else if (dialogMode === 'edit') {
            dispatch(updateShortcut(shortcutData));
        }
    };

    // Handle file selection
    const handleFileSelect = (fileId) => {
        dispatch(setActiveShortcutId(fileId));
    };

    return (<>
        <header>
            <NavBar />
        </header>
        <main>
            <h1>Édition des raccourcis clavier</h1>
            <div className="app_container">
                <aside className="sidebar">
                    <h2>Mes raccourcis clavier</h2>
                    <ShortcutTree
                        files           = {shortcuts}
                        activeFileId    = {activeShortcutId}
                        onFileSelect    = {handleFileSelect}
                    />
                </aside>
                <div className="editor-layout">
                    <div className="editor-container">
                        <p>Raccourci clavier affecté : <strong>{active_shortcut?.shortcut}</strong></p>
                        {!isDefaultShortcut && (
                            <a
                                style   = {{marginLeft: "20px"}}
                                href    = "#"
                                onClick = {(e) => {e.preventDefault(); dispatch(openEditDialog());}}
                            >Modifier</a>
                        )}
                        <MarkdownEditor value={active_shortcut?.content} onChange={handleModifyShortcut} />
                    </div>
                    <div className="preview-container">
                        <MarkdownPreview text={active_shortcut?.content} />
                    </div>
                </div>
            </div>
        </main>
        <footer></footer>
        {showDialog && <KeyboardShortcutInput 
            onSave={handleSaveShortcut} 
            onClose={handleCloseDialog}
            mode={dialogMode}
            shortcutData={dialogMode === 'edit' ? active_shortcut : null}
        />}
    </>);
};