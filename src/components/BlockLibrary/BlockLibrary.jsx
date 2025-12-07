import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlock, clearLibrary, importLibrary } from '../../store/slices/blocks';
import BlockCreator from './BlockCreator';
import './BlockLibrary.css';

const BlockLibrary = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.blocks.library);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showCreator, setShowCreator] = useState(false);

  const handleDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce bloc ?')) {
      dispatch(deleteBlock(id));
    }
  };

  const handleEdit = (block) => {
    setEditingBlock(block);
    setShowCreator(true);
  };

  const handleCloseCreator = () => {
    setEditingBlock(null);
    setShowCreator(false);
  };

  const handleExport = () => {
    if (blocks.length === 0) {
      alert('Aucun bloc à exporter');
      return;
    }

    const dataStr = JSON.stringify(blocks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blocks_${new Date().getTime()}.parts.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportSingle = (block) => {
    const dataStr = JSON.stringify([block], null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${block.name.replace(/[^a-z0-9]/gi, '_')}.part.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.part.mdlc,.parts.mdlc';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedBlocks = JSON.parse(event.target.result);
          if (!Array.isArray(importedBlocks)) {
            alert('Format de fichier invalide');
            return;
          }
          dispatch(importLibrary(importedBlocks));
        } catch (error) {
          alert('Erreur lors de l\'import : ' + error.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearLibrary = () => {
    if (confirm('Voulez-vous vraiment supprimer tous les blocs ?')) {
      dispatch(clearLibrary());
    }
  };

  return (
    <div className="block-library">
      <div className="block-library-header">
        <h2>Bibliothèque de blocs</h2>
        <div className="header-actions">
          <button onClick={() => setShowCreator(!showCreator)} className="create-button">
            {showCreator ? 'Masquer' : '+ Nouveau bloc'}
          </button>
          <button onClick={handleImport} className="import-button">
            📥 Importer
          </button>
          <button onClick={handleExport} className="export-button" disabled={blocks.length === 0}>
            📤 Exporter tout
          </button>
          <button onClick={handleClearLibrary} className="clear-button" disabled={blocks.length === 0}>
            🗑️ Tout supprimer
          </button>
        </div>
      </div>

      {showCreator && (
        <BlockCreator 
          editingBlock={editingBlock} 
          onClose={handleCloseCreator}
        />
      )}

      {blocks.length === 0 ? (
        <div className="empty-state">
          <p>Aucun bloc enregistré</p>
          <p className="empty-hint">Créez votre premier bloc pour commencer !</p>
        </div>
      ) : (
        <div className="blocks-grid">
          {blocks.map((block) => (
            <div key={block.id} className="block-card">
              <div className="block-header">
                <h4>{block.name}</h4>
              </div>
              <pre className="block-content">{block.content}</pre>
              <div className="block-meta">
                <small>Créé le {new Date(block.createdDate).toLocaleDateString()}</small>
              </div>
              <div className="block-actions">
                <button onClick={() => handleEdit(block)} className="edit-btn">
                  ✏️ Modifier
                </button>
                <button onClick={() => handleExportSingle(block)} className="export-btn">
                  📤 Exporter
                </button>
                <button onClick={() => handleDelete(block.id)} className="delete-btn">
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockLibrary;
