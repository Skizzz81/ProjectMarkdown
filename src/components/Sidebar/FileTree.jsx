import { useSelector, useDispatch } from 'react-redux';
import { setActiveFile, toggleFolder } from '../../store/slices/files';

export default function FileTree() {
  
    const files = useSelector(state => state.files.list);
    const activeFileId = useSelector(state => state.files.activeFileId);
    const openFolders = useSelector(state => state.files.openFolders); 
    const dispatch = useDispatch();

    console.log('FileTree - files:', files);
    console.log('FileTree - activeFileId:', activeFileId);

    const ItemClick = (item) => {
        if (item.type === 'folder') {
            dispatch(toggleFolder(item.id));
        } else {
            dispatch(setActiveFile(item.id));
        }
    };

    // Affichage de dossiers et fichiers hierarchiquement
    const renderItem = (item, level = 0) => {
        const isFolder = item.type === 'folder';
        const isOpen = openFolders.includes(item.id);
        const childrens = files.filter(file => file.parentId === item.id);

        return (
            <div key={item.id}>
                <div
                    onClick={() => ItemClick(item)}
                    className={`file-item ${!isFolder && activeFileId === item.id ? 'active' : ''}`}
                    style={{ paddingLeft: `${level * 20}px` }}
                >
                    {isFolder ? '📁' : '📄'} {item.name}
                </div>

                {isFolder && isOpen && childrens.length > 0 && (
                    <div>
                        {childrens.map(child => renderItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const itemsParent = files.filter(file => file.parentId === null);

    return (
        <div>
            {itemsParent.map(item => renderItem(item, 0))}
        </div>
    );
}
