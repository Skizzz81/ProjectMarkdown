import { useState, useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import FileTree                 from '../components/Sidebar/FileTree';
import MarkdownEditor           from '../components/Editor/MarkdownEditor';
import MarkdownPreview          from '../components/Editor/MarkdownPreview';
import NavBar                   from '../components/NavBar/NavBar';
import ImageUpload              from '../components/ImageLibrary/ImageUpload';
import ImageLibrary             from '../components/ImageLibrary/ImageLibrary';
import ImageInsert              from '../components/ImageLibrary/ImageInsert';
import { loadLibraryFromLocalStorage } from '../store/imageSlice';

export default function Home(){
  const dispatch = useDispatch();

  // Charger la bibliothèque d'images au démarrage
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
    const newContent = currentContent + '\n' + markdownSyntax;
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
        <h1>Éditeur MarkDown</h1>

        <div className="app_container">
          <aside className="sidebar">
            <h2>Mes fichiers</h2>

            <FileTree
              files={files}
              activeFileId={activeFileId}
              onFileSelect={setActiveFileId}
            />

            <hr style={{ margin: '1rem 0' }} />

            <ImageUpload />
            <ImageLibrary />
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