import { useSelector, useDispatch } from 'react-redux';
import { setActiveFile, toggleFolder } from '../../store/slices/files';

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


    const handleClick = (e) => {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        if (isFolder) {
            dispatch(toggleFolder(item.id));
        } else {
            dispatch(setActiveFile(item.id));
        }
    };

    return (
        <div>
            <div
                onClick={handleClick}
                className={`file-item ${!isFolder && activeFileId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${level * 20}px` }}
            >
                {isFolder ? (isOpen ? '📂' : '📁') : '📄'} {item.name}
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
