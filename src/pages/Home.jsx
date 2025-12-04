import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import FileTree from '../components/Sidebar/FileTree';
import Editor from '../components/Editor/Editor';

export default function Home() {

  const files = useSelector(state => state.files.list);

  // Sauvegarder dans localStorage à chaque modification d'un fichier
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
          </aside>
          <Editor />
        </div>
      </main>
      <footer></footer>
    </>
  );
}