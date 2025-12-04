
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileTree from '../components/Sidebar/FileTree';
import Editor from '../components/Editor/Editor';
import NavBar from '../components/NavBar/NavBar';
import ImageInsert from '../components/ImageLibrary/ImageInsert';
import { loadLibraryFromLocalStorage } from '../store/slices/images';
import { updateFileContent } from '../store/slices/files';

export default function Home() {
  const dispatch = useDispatch();
  // Charger la bibliothèque d'images au démarrage
  useEffect(() => {
    dispatch(loadLibraryFromLocalStorage());
  }, [dispatch]);

  // Lire les fichiers 
  const files = useSelector(state => state.files.list);
  const activeFileId = useSelector(state => state.files.activeFileId);

  // Insérer une image dans le fichier actif
  const handleInsertImage = (markdownSyntax) => {
    const activeFile = files.find(file => file.id === activeFileId);
    const currentContent = activeFile?.content || '';
    const newContent = currentContent + '\n' + markdownSyntax;
    dispatch(updateFileContent({ id: activeFileId, content: newContent }));
  };

  // Sauvegarder automatiquement dans localStorage à chaque modification
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
            <FileTree />
            <ImageInsert onInsertImage={handleInsertImage} />
          </aside>
          <Editor />
        </div>
      </main>
      <footer></footer>
    </>
  );
}