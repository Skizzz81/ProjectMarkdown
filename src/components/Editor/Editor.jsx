import { useSelector, useDispatch } from 'react-redux';
import { updateFileContent } from '../../store/slices/files';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';

export default function Editor() {
   
    const files = useSelector(state => state.files.list);
    const activeFileId = useSelector(state => state.files.activeFileId);
    const dispatch = useDispatch();

    // Trouver le fichier actif
    const activeFile = files.find(file => file.id === activeFileId);

    // modifier le contenu
    const handleContentChange = (newContent) => {
        dispatch(updateFileContent({ id: activeFileId, content: newContent }));
    };

    return (
        <div className="editor-layout">
            <div className="editor-container">
                <MarkdownEditor 
                    value={activeFile.content} 
                    onChange={handleContentChange} 
                />
            </div>
            <div className="preview-container">
                <MarkdownPreview text={activeFile.content} />
            </div>
        </div>
    );
}
