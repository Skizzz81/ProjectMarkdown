import { useSelector } from 'react-redux';
import './ImageInsert.css';

export default function ImageInsert({ onInsertImage }) {
  const images = useSelector(state => state.images.library);

  const handleInsertImage = (image) => {
    // Créer la syntaxe Markdown pour insérer l'image
    const markdownSyntax = `![${image.name}](${image.base64})`;
    onInsertImage(markdownSyntax);
  };

  return (
    <div className="image-insert">
      <h3>Insérer une image</h3>
      {images.length === 0 ? (
        <p className="no-images">Aucune image disponible. Importez-en d'abord.</p>
      ) : (
        <div className="insert-grid">
          {images.map(image => (
            <div key={image.id} className="insert-item">
              <img src={image.base64} alt={image.name} className="insert-thumbnail" />
              <button
                className="btn-insert"
                onClick={() => handleInsertImage(image)}
                title={`Insérer ${image.name}`}
              >
                Insérer
              </button>
              <p className="insert-name" title={image.name}>{image.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
