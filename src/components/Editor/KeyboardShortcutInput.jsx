import { useState, useEffect } from 'react';
import './KeyboardShortcutInput.css';

export default function KeyboardShortcutInput({ onSave, onClose, mode = 'add', shortcutData = null }) {
    const [shortcutName, setShortcutName]   = useState('');
    const [shortcut_key, setShortcutKey]    = useState('');
    const [is_recording, setIsRecording]    = useState(false);

    // Pre-fill form ifin edit mode
    useEffect(() => {
        if(mode === 'edit' && shortcutData){
            setShortcutName(shortcutData.name);
            setShortcutKey(shortcutData.shortcut);
        }
    }, [mode, shortcutData]);

    const handleKeyDown = (e) => {
        if(!is_recording){return;};

        e.preventDefault();
        const parts = [];

        if(e.ctrlKey){parts.push('Ctrl');};
        if(e.altKey){parts.push('Alt');};
        if(e.shiftKey){parts.push('Shift');};
        if(e.key && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift'){parts.push(e.key.toUpperCase());};
        if(parts.length > 0){setShortcutKey(parts.join('+'));};
    };

    const handleSave = () => {
        if(shortcutName.trim() && shortcut_key.trim()) {
            onSave({
                name: shortcutName,
                shortcut: shortcut_key
            });
            setShortcutName('');
            setShortcutKey('');
            setIsRecording(false);
        }
    };

    const handleClose = () => {
        setShortcutName('');
        setShortcutKey('');
        setIsRecording(false);
        onClose();
    };

    const dialog_title = mode === 'edit' ? 'Modifier un raccourci clavier' : 'Ajouter un raccourci clavier';

    return (
        <div className="dialog-overlay" onClick={handleClose}>
            <div className="dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
                <div className="dialog-header">
                    <h2>{dialog_title}</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="dialog-content">
                    <div className="form-group">
                        <label htmlFor="shortcut-name">Nom du raccourci :</label>
                        <input
                            id          = "shortcut-name"
                            type        = "text"
                            placeholder = "Ex.: Paragraphe notable"
                            value       = {shortcutName}
                            onChange    = {(e) => setShortcutName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shortcut-key">Raccourci :</label>
                        <div className="shortcut-input-group">
                            <input
                                id          = "shortcut-key"
                                type        = "text"
                                placeholder = "Cliquez sur 'Enregistrer' et effectuez votre nouveau raccourci sur votre clavier"
                                value       = {shortcut_key}
                                readOnly
                                className   = {is_recording ? 'recording' : ''}
                            />
                            <button
                                className={`record-btn ${is_recording ? 'recording' : ''}`}
                                onClick={() => setIsRecording(!is_recording)}
                            >
                                {is_recording ? '⏹ Arrêter' : '⏺ Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dialog-footer">
                    <button className="btn-cancel" onClick={handleClose}>Annuler</button>
                    <button className="btn-save" onClick={handleSave} disabled={!shortcutName.trim() || !shortcut_key.trim()}>
                        {mode === 'edit' ? 'Mettre à jour' : 'Sauvegarder'}
                    </button>
                </div>
            </div>
        </div>
    );
};