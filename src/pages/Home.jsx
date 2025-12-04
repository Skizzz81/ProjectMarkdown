import { useState, useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import FileTree                 from '../components/Sidebar/FileTree';
import MarkdownEditor           from '../components/Editor/MarkdownEditor';
import MarkdownPreview          from '../components/Editor/MarkdownPreview';
import NavBar                   from '../components/NavBar/NavBar';
import ImageInsert              from '../components/ImageLibrary/ImageInsert';
import { loadLibraryFromLocalStorage } from '../store/imageSlice';

export default function Home(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLibraryFromLocalStorage());
  }, [dispatch]);

  // Charger le texte sauvegardé au démarrage
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('markdown-files');
    return savedFiles ? JSON.parse(savedFiles) : [
      { id: 1, name: "notes.md", content: "content 1 ", type: 'file', parentID: 'null' },
      { id: 2, name: "todo.md", content: "content 2", type: 'file', parentID: 'null' },
      { id: 3, name: "ideas.md", content: "content 3", type: 'file', parentID: 'null' }
    ];
  });

  const [activeFileId, setActiveFileId] = useState(1);

  //  trouver le fichier Actif 
  const activeFile = files.find(file => file.id === activeFileId);

  // change contenu du fichier actif 
  const changeContent = (newContent) => {
    setFiles(files.map(file => file.id === activeFileId ? { ...file, content: newContent } : file
    ));
  }

  // Insérer une image dans le contenu du fichier actif
  const handleInsertImage = (markdownSyntax) => {
    const currentContent = activeFile?.content || '';
    const newContent = currentContent + '\n\n' + markdownSyntax + '\n\n';
    changeContent(newContent);
  };

  // Sauvegarder automatiquement à chaque modification
  useEffect(() => {
    localStorage.setItem('markdown-files', JSON.stringify(files));
  }, [files]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1 style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '1rem 0',
          padding: '0 1rem'
        }}>Éditeur MarkDown</h1>

        <div className="app_container">
          <aside className="sidebar">
            <h2 style={{
              color: '#495057',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '3px solid #667eea'
            }}>📁 Mes fichiers</h2>

            <FileTree
              files={files}
              activeFileId={activeFileId}
              onFileSelect={setActiveFileId}
            />

            <hr style={{ margin: '1rem 0' }} />

            {/* Affichage uniquement des images et insertion */}
            <ImageInsert onInsertImage={handleInsertImage} />
          </aside>

          <div className="editor-layout">
            <div className="editor-container">
              <MarkdownEditor value={activeFile?.content || ''} onChange={changeContent} />
            </div>
            <div className="preview-container">
              <MarkdownPreview text={activeFile?.content || ''} />
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};