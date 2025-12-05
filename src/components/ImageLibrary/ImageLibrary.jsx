import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteImage, renameImage, clearLibrary, importLibrary } from '../../store/slices/images';
import './ImageLibrary.css';

export default function ImageLibrary() {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.library);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleDeleteImage = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      dispatch(deleteImage(id));
    }
  };

  const handleRenameImage = (id) => {
    if (newName.trim()) {
      dispatch(renameImage({ id, name: newName }));
      setEditingId(null);
      setNewName('');
    }
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleClearLibrary = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider toute la bibliothèque ?')) {
      dispatch(clearLibrary());
    }
  };

  const handleExport = () => {
    const state = {
      library: images,
      nextId: images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1,
    };
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `image-library-${new Date().toISOString().split('T')[0]}.imgs.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (!content) {
          alert('Le fichier est vide.');
          return;
        }
        
        const data = JSON.parse(content);
        
        if (!data.library || !Array.isArray(data.library)) {
          alert('Format de fichier invalide. Le fichier doit contenir une propriété "library" avec un tableau d\'images.');
          return;
        }
        
        dispatch(importLibrary(data));
        alert(`Bibliothèque importée avec succès ! ${data.library.length} image(s) ajoutée(s).`);
      } catch (error) {
        console.error('Erreur import:', error);
        alert('Erreur lors de l\'import : ' + error.message);
      }
    };
    
    reader.onerror = () => {
      alert('Erreur lors de la lecture du fichier.');
    };
    
    reader.readAsText(file);
    e.target.value = ''; // Réinitialiser l'input
  };

  return (
    <div className="image-library">
      <div className="library-header">
        <h3>Bibliothèque d'images ({images.length})</h3>
        <div className="library-controls">
          <label className="btn btn-import">
            Importer
            <input type="file" accept=".imgs.mdlc,.json,text/*" onChange={handleImport} hidden />
          </label>
          <button className="btn btn-export" onClick={handleExport} disabled={images.length === 0}>
            Exporter
          </button>
          <button className="btn btn-clear" onClick={handleClearLibrary} disabled={images.length === 0}>
            Vider
          </button>
        </div>
      </div>

      <div className="library-grid">
        {images.length === 0 ? (
          <p className="empty-message">Aucune image dans la bibliothèque</p>
        ) : (
          images.map(image => (
            <div key={image.id} className="image-card">
              <img src={image.base64} alt={image.name} className="image-thumbnail" />
              <div className="image-info">
                {editingId === image.id ? (
                  <div className="rename-input">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleRenameImage(image.id)}
                      autoFocus
                      placeholder="Nouveau nom..."
                    />
                    <div className="rename-buttons">
                      <button className="btn-save" onClick={() => handleRenameImage(image.id)}>Valider</button>
                      <button className="btn-cancel" onClick={() => setEditingId(null)}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="image-name" title={image.name}>{image.name}</p>
                    <button 
                      className="btn-rename" 
                      onClick={() => startEditing(image.id, image.name)}
                      title="Renommer"
                    >
                      Renommer
                    </button>
                  </>
                )}
                <p className="image-meta">{image.format.toUpperCase()} • {(image.size / 1024).toFixed(2)} KB</p>
                <p className="image-date">{new Date(image.uploadDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDeleteImage(image.id)}
                title="Supprimer cette image"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
