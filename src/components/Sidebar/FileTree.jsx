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

    // Fonction pour obtenir le chemin complet d'un dossier
    const getFolderPath = (folderId) => {
        const folder = files.find(f => f.id === folderId);
        if (!folder) return '';
        
        if (folder.parentId === null) {
            return folder.name;
        }
        
        const parentPath = getFolderPath(folder.parentId);
        return `${parentPath} / ${folder.name}`;
    };

    const handleAddFile = () => {
        const name = prompt('Nom du fichier (ex: notes.md):');
        if (!name) return;

        // Demander le dossier parent avec chemin complet
        const foldersList = folders.map(f => `${f.id}: ${getFolderPath(f.id)}`).join('\n');
        const parentIdStr = prompt(
            `Dossier parent (ID) ?\nLaisser vide pour la racine\n\nDossiers disponibles:\n${foldersList}`
        );
        
        const parentId = parentIdStr ? parseInt(parentIdStr) : null;
        dispatch(addFile({ name, parentId }));
    };

    const handleAddFolder = () => {
        const name = prompt('Nom du dossier:');
        if (!name) return;

        // Demander le dossier parent avec chemin complet
        const foldersList = folders.map(f => `${f.id}: ${getFolderPath(f.id)}`).join('\n');
        const parentIdStr = prompt(
            `Dossier parent (ID) ?\nLaisser vide pour la racine\n\nDossiers disponibles:\n${foldersList}`
        );
        
        const parentId = parentIdStr ? parseInt(parentIdStr) : null;
        dispatch(addFolder({ name, parentId }));
    };

    const handleExportFile = () => {
        const markdownFiles = files.filter(file => file.type === 'file');
        
        if (markdownFiles.length === 0) {
            alert('Aucun fichier à exporter.');
            return;
        }
        const filesList = markdownFiles.map(f => `${f.id}: ${f.name}`).join('\n');
        const fileIdStr = prompt(
            `Quel fichier voulez-vous exporter ?\n\nFichiers disponibles:\n${filesList}\n\nEntrez l'ID du fichier:`
        );

        if (!fileIdStr) return;
        const fileId = parseInt(fileIdStr);
        const fileToExport = markdownFiles.find(f => f.id === fileId);
        if (!fileToExport) {
            alert('Fichier introuvable. Vérifiez l\'ID.');
            return;
        }

        const content = fileToExport.content || '';
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileToExport.name.endsWith('.md') ? fileToExport.name : `${fileToExport.name}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImportFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith('.md')) {
            alert('Veuillez importer un fichier .md');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result;
                
                const foldersList = folders.map(f => `${f.id}: ${getFolderPath(f.id)}`).join('\n');
                const parentIdStr = prompt(
                    `Importer "${file.name}" dans quel dossier ?\nLaisser vide pour la racine\n\nDossiers disponibles:\n${foldersList}`
                );
                
                if (parentIdStr === null) {
                    return;
                }
                
                let parentId = null;

                if (parentIdStr.trim() !== '') {
                    const parsedId = parseInt(parentIdStr);
                    if (folders.find(f => f.id === parsedId)) {
                        parentId = parsedId;
                    } else {
                        alert(`Dossier avec l'ID ${parentIdStr} introuvable. Le fichier sera ajouté à la racine.`);
                    }
                }
                
                dispatch(addFile({ 
                    name: file.name, 
                    parentId,
                    content: content 
                }));
                
                alert(`Fichier "${file.name}" importé avec succès !`);
            } catch (error) {
                alert('Erreur lors de l\'import : ' + error.message);
            }
        };

        reader.onerror = () => {
            alert(`Erreur lors de la lecture du fichier ${file.name}`);
        };

        reader.readAsText(file);
        e.target.value = ''; 
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
                <button onClick={handleAddFile} style={{ cursor: 'pointer' }}>
                    📄 Nouveau fichier
                </button>
                <button onClick={handleAddFolder} style={{ cursor: 'pointer' }}>
                    📁 Nouveau dossier
                </button>
                <button onClick={handleExportFile} style={{ cursor: 'pointer' }}>
                    💾 Exporter
                </button>
                <label className="import-button-label">
                    📥 Importer
                    <input 
                        type="file" 
                        accept=".md" 
                        onChange={handleImportFile} 
                        hidden 
                    />
                </label>
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
