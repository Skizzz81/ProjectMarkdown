import { useSelector } from 'react-redux';
import './BlockInsert.css';

const BlockInsert = ({ onInsert }) => {
  const blocks = useSelector((state) => state.blocks.library);

  const handleInsertBlock = (block) => {
    if (onInsert) {
      onInsert(block.content);
    }
  };

  return (
    <div className="block-insert">
      <h3>Blocs rapides</h3>

      {blocks.length === 0 ? (
        <p className="no-blocks">Aucun bloc disponible</p>
      ) : (
        <div className="blocks-list">
          {blocks.map((block) => (
            <div key={block.id} className="block-item">
              <div className="block-item-header">
                <span className="block-name">{block.name}</span>
              </div>
              <button 
                onClick={() => handleInsertBlock(block)}
                className="insert-btn"
              >
                + Insérer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockInsert;
