import { useState, useEffect }  from 'react';
import FileTree                 from '../components/Sidebar/FileTree';
import NavBar                   from '../components/NavBar/NavBar';
import MarkdownEditor           from '../components/Editor/MarkdownEditor';
import MarkdownPreview          from '../components/Editor/MarkdownPreview';

export default function KeyboardShortcutsMenu(){
    // Loading the saved shortcuts at startup
    const [shortcuts, setShortcuts] = useState(() => {
        const saved_shortcuts = localStorage.getItem('keyboard-shortcuts');

        return [
            {id: 1, name: "Bold",      content: "Content 1",   type: 'file',    shortcut: 'Ctrl+B', parentID: 'null'},
            {id: 2, name: "Italic",    content: "Content 2",   type: 'file',    shortcut: 'Ctrl+I', parentID: 'null'},
            {id: 3, name: "Title 1",   content: "Content 3",   type: 'file',    shortcut: 'Ctrl+1', parentID: 'null'},
            ...(saved_shortcuts ? JSON.parse(saved_shortcuts) : [])
        ];
    });
    const [active_shortcut_id, setActiveShortcutId] = useState(1);

    // Finding the active shortcut
    const active_shortcut = shortcuts.find(file => file.id === active_shortcut_id);

    // Modifying the current shortcut
    const modifyShortcut = (newShortcut) => {
        setShortcuts(shortcuts.map(file => file.id === active_shortcut_id ? { ...file, content: newShortcut } : file));
    };

    // Automatically save on every modification
    useEffect(() => {
        localStorage.setItem('keyboard-shortcuts', JSON.stringify(shortcuts));
    }, [shortcuts]);

    return (<>
        <header>
            <NavBar />
        </header>
        <main>
            <h1>Édition des raccourcis clavier</h1>
            <div className="app_container">
                <aside className="sidebar">
                    <h2>Mes raccourcis clavier</h2>
                    <FileTree
                        files           = {shortcuts}
                        activeFileId    = {active_shortcut_id}
                        onFileSelect    = {setActiveShortcutId}
                    />
                </aside>
                <div className="editor-layout">
                    <div className="editor-container">
                        <MarkdownEditor value={active_shortcut.content} onChange={modifyShortcut} />
                    </div>
                    <div className="preview-container">
                        <MarkdownPreview text={active_shortcut.content} />
                    </div>
                </div>
            </div>
        </main>
        <footer></footer>
    </>);
};