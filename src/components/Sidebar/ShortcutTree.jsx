import { useSelector, useDispatch } from 'react-redux';
import { setActiveShortcutId, openAddDialog } from '../../store/slices/shortcuts';
import ShortcutItem                 from './ShortcutItem';

export default function ShortcutTree({ files, activeFileId, onFileSelect }) {
    const dispatch = useDispatch();

    // Filter shortcuts that are at root level
    const rootItems = files.filter(file => file.parentID === 'null' || file.parentID === null);

    const handleAddShortcut = () => {
        dispatch(openAddDialog());
    };

    return (
        <div>
            <div style={{ 
                padding: '10px', 
                borderBottom: '1px solid #ccc',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
            }}>
                <button onClick={handleAddShortcut} style={{ cursor: 'pointer' }}>
                    ⌨️ Nouveau raccourci clavier
                </button>
            </div>

            <div>
                {rootItems.map(item => (
                    <ShortcutItem 
                        key={item.id} 
                        item={item} 
                        level={0}
                        activeFileId={activeFileId}
                        onFileSelect={onFileSelect}
                    />
                ))}
            </div>
        </div>
    );
};