import { useDispatch }                                 from 'react-redux';
import { setActiveShortcutId, deleteShortcut }         from '../../store/slices/shortcuts';
import './ShortcutItem.css';

export default function ShortcutItem({ item, level = 0, activeFileId, onFileSelect }){
    const dispatch = useDispatch();

    const handleDeleteItem = () => {
        if (window.confirm(`Supprimer le raccourci "${item.name}" ?`)) {
            dispatch(deleteShortcut(item.id));
        }
    };

    const handleClick = (e) => {
        e.stopPropagation(); 
        onFileSelect(item.id);
    };

    return (
        <div>
            <div
                className={`file-item ${activeFileId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${level * 20}px` }}
            >
                <span
                    className="file-item-label"
                    onClick={handleClick}
                >
                    ⌨️
                    <span className="file-item-name">{item.name}</span>
                </span>
                <div className="file-actions">
                    <button className="file-delete-btn" onClick={handleDeleteItem} title="Supprimer">🗑️</button>
                </div>
            </div>
        </div>
    );
};