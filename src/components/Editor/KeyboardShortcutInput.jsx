import { useState } from 'react';
import './KeyboardShortcutInput.css';

export default function KeyboardShortcutInput({onSave, onClose, shortcut_data}) {
    const [shortcut_name, setShortcutName]  = useState(shortcut_data ? shortcut_data.name : '');
    const [shortcut_key, setShortcutKey]    = useState(shortcut_data ? shortcut_data.shortcut : '');
    const [is_recording, setIsRecording]    = useState(false);

    const handleKeyDown = (e) => {
        if(!is_recording){return};

        e.preventDefault();
        const parts = [];

        if(e.ctrlKey){parts.push('Ctrl')};
        if(e.altKey){parts.push('Alt')};
        if(e.shiftKey){parts.push('Shift')};
        if(e.key && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift'){parts.push(e.key.toUpperCase());};
        if(parts.length > 0){setShortcutKey(parts.join('+'));};
    };

    const handleSave = () => {
        if(shortcut_name.trim() && shortcut_key.trim()){
            onSave({
                name: shortcut_name,
                shortcut: shortcut_key
            });
            setShortcutName('');
            setShortcutKey('');
            setIsRecording(false);
        };
    };

    const handleClose = () => {
        setShortcutName('');
        setShortcutKey('');
        setIsRecording(false);
        onClose();
    };

    return (
        <div className="dialog-overlay" onClick={handleClose}>
            <div className="dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
                <div className="dialog-header">
                    <h2>{shortcut_data ? 'Modifier' : 'Ajouter'} un raccourci clavier</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="dialog-content">
                    <div className="form-group">
                        <label htmlFor="shortcut-name">Nom du raccourci :</label>
                        <input
                            id="shortcut-name"
                            type="text"
                            placeholder="Ex: Sauvegarder"
                            value={shortcut_name}
                            onChange={(e) => setShortcutName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shortcut-key">Raccourci :</label>
                        <div className="shortcut-input-group">
                            <input
                                id="shortcut-key"
                                type="text"
                                placeholder="Cliquez sur 'Enregistrer' et appuyez sur votre raccourci"
                                value={shortcut_key}
                                readOnly
                                className={is_recording ? 'recording' : ''}
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
                    <button className="btn-save" onClick={handleSave} disabled={!shortcut_name.trim() || !shortcut_key.trim()}>Sauvegarder</button>
                </div>
            </div>
        </div>
    );
};