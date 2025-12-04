import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../store/slices/images';
import './ImageUpload.css';

export default function ImageUpload() {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const imageCount = useSelector(state => state.images.library.length);
  const imageLibrary = useSelector(state => state.images.library);
  const nextId = useSelector(state => state.images.nextId);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} n'est pas une image valide`);
        return;
      }

      setUploading(true);
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const base64String = event.target?.result;
          const format = file.type.split('/')[1].toUpperCase();

          dispatch(addImage({
            name: file.name,
            base64: base64String,
            format,
            size: file.size,
            uploadDate: new Date().toISOString(),
          }));
        } catch (error) {
          alert('Erreur lors de la conversion en Base64: ' + error.message);
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        alert(`Erreur lors de la lecture du fichier ${file.name}`);
        setUploading(false);
      };

      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <div className="image-upload">
      <label className="upload-label">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          hidden
        />
        <div className="upload-box">
          <div className="upload-icon">📤</div>
          <h4>Ajouter des images</h4>
          <p>Déposez vos images</p>
          {uploading && <span className="uploading">Traitement...</span>}
        </div>
      </label>
      {imageCount > 0 && <p className="upload-hint">Images en bibliothèque: {imageCount}</p>}
    </div>
  );
}
