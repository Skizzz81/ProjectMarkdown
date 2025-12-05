import { useSelector, useDispatch } from 'react-redux';
import { addFile, addFolder } from '../../store/slices/files';
import FileItem from './FileItem';

export default function FileTree() {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files.list);

    // Récupérer les éléments à la racine
    const rootItems = files.filter(file => file.parentId === null);

    // Récupérer tous les dossiers 
    const folders = files.filter(file => file.type === 'folder');

    const handleAddFile = () => {
        const name = prompt('Nom du fichier (ex: notes.md):');
        if (!name) return;

        // Demander le dossier parent
        const foldersList = folders.map(f => `${f.id}: ${f.name}`).join('\n');
        const parentIdStr = prompt(
            `Dossier parent (ID) ?\nLaisser vide pour la racine\n\nDossiers disponibles:\n${foldersList}`
        );
        
        const parentId = parentIdStr ? parseInt(parentIdStr) : null;
        dispatch(addFile({ name, parentId }));
    };

    const handleAddFolder = () => {
        const name = prompt('Nom du dossier:');
        if (!name) return;

        // Demander le dossier parent
        const foldersList = folders.map(f => `${f.id}: ${f.name}`).join('\n');
        const parentIdStr = prompt(
            `Dossier parent (ID) ?\nLaisser vide pour la racine\n\nDossiers disponibles:\n${foldersList}`
        );
        
        const parentId = parentIdStr ? parseInt(parentIdStr) : null;
        dispatch(addFolder({ name, parentId }));
    };

    return (
        <div>
            <div style={{ 
                padding: '10px', 
                borderBottom: '1px solid #ccc',
                display: 'flex',
                gap: '10px'
            }}>
                <button onClick={handleAddFile} style={{ cursor: 'pointer' }}>
                    📄 Nouveau fichier
                </button>
                <button onClick={handleAddFolder} style={{ cursor: 'pointer' }}>
                    📁 Nouveau dossier
                </button>
            </div>

            <div>
                {rootItems.map(item => (
                    <FileItem 
                        key={item.id} 
                        item={item} 
                        level={0}
                    />
                ))}
            </div>
        </div>
    );
}
