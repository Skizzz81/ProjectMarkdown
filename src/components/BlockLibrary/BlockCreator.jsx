import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlock, updateBlock } from '../../store/slices/blocks';
import './BlockCreator.css';

const BlockCreator = ({ editingBlock = null, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(editingBlock?.name || '');
  const [content, setContent] = useState(editingBlock?.content || '');

  const handleSave = () => {
    if (!name.trim() || !content.trim()) {
      alert('Le nom et le contenu sont obligatoires');
      return;
    }

    if (editingBlock) {
      dispatch(updateBlock({
        id: editingBlock.id,
        updates: { name: name.trim(), content: content.trim() }
      }));
    } else {
      dispatch(addBlock({
        name: name.trim(),
        content: content.trim()
      }));
    }

    // Reset form
    setName('');
    setContent('');
    
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setName('');
    setContent('');
    if (onClose) onClose();
  };

  return (
    <div className="block-creator">
      <h3>{editingBlock ? 'Modifier le bloc' : 'Créer un nouveau bloc'}</h3>
      
      <div className="block-creator-form">
        <div className="form-group">
          <label htmlFor="block-name">Nom du bloc *</label>
          <input
            id="block-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: En-tête de document"
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="block-content">Contenu markdown *</label>
          <textarea
            id="block-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Titre&#10;Votre contenu markdown ici..."
            rows={10}
          />
        </div>

        <div className="block-creator-actions">
          <button onClick={handleSave} className="save-button">
            {editingBlock ? 'Mettre à jour' : 'Créer'}
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockCreator;
