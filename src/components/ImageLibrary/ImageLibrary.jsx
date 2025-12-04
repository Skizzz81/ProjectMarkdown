import { useSelector, useDispatch } from 'react-redux';
import { deleteImage, clearLibrary, importLibrary } from '../../store/imageSlice';
import './ImageLibrary.css';

export default function ImageLibrary() {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.library);

  const handleDeleteImage = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      dispatch(deleteImage(id));
      // Sauvegarder dans localStorage
      saveToLocalStorage(images.filter(img => img.id !== id));
    }
  };

  const handleClearLibrary = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider toute la bibliothèque ?')) {
      dispatch(clearLibrary());
      saveToLocalStorage([]);
    }
  };

  const saveToLocalStorage = (library) => {
    const state = {
      library,
      nextId: library.length > 0 ? Math.max(...library.map(img => img.id)) + 1 : 1,
    };
    localStorage.setItem('markdown-images', JSON.stringify(state));
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
        const data = JSON.parse(event.target?.result);
        if (data.library && Array.isArray(data.library)) {
          dispatch(importLibrary(data));
          saveToLocalStorage(data.library);
          alert('Bibliothèque importée avec succès !');
        } else {
          alert('Format de fichier invalide. Veuillez importer un fichier de bibliothèque valide.');
        }
      } catch (error) {
        alert('Erreur lors de l\'import : ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="image-library">
      <div className="library-header">
        <h3>Bibliothèque d'images ({images.length})</h3>
        <div className="library-controls">
          <label className="btn btn-import">
            Importer
            <input type="file" accept=".imgs.mdlc" onChange={handleImport} hidden />
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
                <p className="image-name" title={image.name}>{image.name}</p>
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
