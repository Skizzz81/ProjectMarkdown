import { useState, useEffect }  from 'react';
import FileTree                 from '../../components/Sidebar/FileTree';
import MarkdownEditor           from '../../components/Editor/MarkdownEditor';
import MarkdownPreview          from '../../components/Editor/MarkdownPreview';

export default function Home(){
  // Charger le texte sauvegardé au démarrage
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('markdown-files');
    return savedFiles ? JSON.parse(savedFiles) : [
    { id: 1, name: "Projets", type: 'folder', parentId: null },
    { id: 2, name: "Personnel", type: 'folder', parentId: null },
    { id: 3, name: "notes.md", content: "# Notes du projet", type: 'file', parentId: 1 },
    { id: 4, name: "todo.md", content: "# Todo list", type: 'file', parentId: 1 },
    { id: 5, name: "ideas.md", content: "# Mes idées", type: 'file', parentId: 2 },
    { id: 6, name: "readme.md", content: "# Readme", type: 'file', parentId: null },
    { id: 7, name: "tuto.md", content: "# Tuto", type: 'file', parentId: null },
    { id: 8, name: "Vacances", type: 'folder', parentId: 2 },
    { id: 9, name: "2024.md", content: "# Vacances 2024", type: 'file', parentId: 8 },
    { id: 10, name: "2025.md", content: "# Vacances 2025", type: 'file', parentId: 8 }
  ];
  });

  const [activeFileId, setActiveFileId] = useState(3);

  //  trouver le fichier Actif 
  const activeFile = files.find(file => file.id === activeFileId);

  // change contenu du fichier actif 
  const changeContent = (newContent) => {
    setFiles(files.map(file => file.id === activeFileId ? { ...file, content: newContent } : file
    ));
  }

  // Sauvegarder automatiquement à chaque modification
  useEffect(() => {
    localStorage.setItem('markdown-files', JSON.stringify(files));
  }, [files]);

  return (
    <>
      <h1>Éditeur MarkDown</h1>

      <div className="app_container">
        <aside className="sidebar">
          <h2>Mes fichiers</h2>

          <FileTree
            files={files}
            activeFileId={activeFileId}
            onFileSelect={setActiveFileId}
          />
        </aside>

        <div className="editor-layout">
          <div className="editor-container">
            <MarkdownEditor value={activeFile.content} onChange={changeContent} />
          </div>
          <div className="preview-container">
            <MarkdownPreview text={activeFile.content} />
          </div>
        </div>
      </div>
    </>
  );
};