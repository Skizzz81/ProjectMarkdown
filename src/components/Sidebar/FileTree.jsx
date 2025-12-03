import { useState } from "react";


export default function FileTree({ files, activeFileId, onFileSelect }) {

    // id des dossier ouverts 
    const [openFolders, setOpenFolders] = useState([]);

    const toggleFolder = (folderId) => {
        setOpenFolders(prev =>
            prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
        );
    };

    const ItemClick = (item) => {
        if (item.type === 'folder') {
            toggleFolder(item.id);
        } else {
            onFileSelect(item.id);
        }
    };

    //  afficher les fichier et les dossiers hierarchiquement 
       const renderItem = (item, level = 0) => {

        const isFolder = item.type === 'folder';
        const isOpen = openFolders.includes(item.id);
        const childrens = files.filter(file => file.parentId === item.id);

        return (
            <div key={item.id}>
                <div
                    onClick={() => ItemClick(item)}
                    className={`file-item ${!isFolder && activeFileId === item.id ? 'active' : ''}`}
                    style={{ paddingLeft: `${level * 20 }px` }}
                >
                    {isFolder ?  '📁' : '📄'} {item.name}
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