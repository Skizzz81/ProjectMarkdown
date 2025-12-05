import { useSelector, useDispatch } from 'react-redux';
import { deleteItems, renameItems, setActiveFile, toggleFolder, moveItem } from '../../store/slices/files';
import './FileItem.css';

export default function FileItem({ item, level = 0 }) {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files.list);
    const activeFileId = useSelector(state => state.files.activeFileId);
    const openFolders = useSelector(state => state.files.openFolders);

    const isFolder = item.type === 'folder';
    const isOpen = openFolders.includes(item.id);
    const childrens = files.filter(file => file.parentId === item.id);

    // Trier : dossiers d'abord, fichiers ensuite
    const sortedChildrens = childrens.sort((a, b) => {
        if (a.type === 'folder' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'folder') return 1;
        return 0;
    });


    const handleRenameItem = () => {
        const newName = prompt('Nouveau nom ?', item.name);
        if (newName) {
            dispatch(renameItems({ id: item.id, newName }));
        }
    };

    const handleDeleteItem = () => {
        dispatch(deleteItems(item.id));
    }


    function hasChildren(parentId, targetId, files) {
        const children = files.filter(f => f.parentId === parentId);
        for (const child of children) {
            if (child.id === targetId) return true;
            if (hasChildren(child.id, targetId, files)) return true;
        }
        return false;
    }

    const handleClick = (e) => {
        e.stopPropagation();
        if (isFolder) {
            dispatch(toggleFolder(item.id));
        } else {
            dispatch(setActiveFile(item.id));
        }
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('itemId', item.id)
        e.dataTransfer.setData('itemType', item.type)

    }

    const handleDrop = (e) => {
        const itemId = e.dataTransfer.getData('itemId');
        if (Number(itemId) === item.id) return;
        if (hasChildren(Number(itemId), item.id, files)) return;
        dispatch(moveItem({ id: Number(itemId), newParentId: item.id }));
    }

    return (
        <div>
            <div
                className={`file-item ${!isFolder && activeFileId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${level * 20}px` }}
                draggable={true}
                onDragStart={e => handleDragStart(e)}
                onDragOver={isFolder ? (e) => e.preventDefault() : undefined}
                onDrop={isFolder ? (e) => handleDrop(e) : undefined}
            >
                <span
                    className="file-item-label"
                    onClick={handleClick}
                >
                    {isFolder ? (isOpen ? '📂' : '📁') : '📄'}
                    <span className="file-item-name">{item.name}</span>
                </span>
                <div className="file-actions">
                    <button className="file-rename-btn" onClick={handleRenameItem} title="Renommer">✏️</button>
                    <button className="file-delete-btn" onClick={handleDeleteItem} title="Supprimer">🗑️</button>
                </div>
            </div>

            {isFolder && isOpen && sortedChildrens.length > 0 && (
                <div>
                    {sortedChildrens.map(child => (
                        <FileItem
                            key={child.id}
                            item={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
