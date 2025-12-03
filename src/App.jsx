import { useState, useEffect } from "react";

import MarkdownEditor from "./components/Editor/MarkdownEditor";
import MarkdownPreview from "./components/Editor/MarkdownPreview";
import "./App.css";


export default function App() {
  
    // Charger le texte sauvegardé au démarrage
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem("markdown-files");
    return savedFiles ? JSON.parse(savedFiles) : [
      { id: 1, name: "notes.md", content: "content 1 " },
      { id: 2, name: "todo.md", content: "content 2" },
      { id: 3, name: "ideas.md", content: "content 3" }
    ];
  });


  // Fichier actif id = 1 TODO : dynamique
const[activeFileId , setActiveFileId ] = useState(1); 

//  trouver le fichier Actif 
const activeFile = files.find(file => file.id === activeFileId);


const changeContent = (newContent) => {
setFiles(files.map(file => file.id === activeFileId ?  {...file, content: newContent} : file 
    ));
}

  // Sauvegarder automatiquement à chaque modification
  useEffect(() => {
    localStorage.setItem("markdown-files", JSON.stringify(files));
  }, [files]);

  return (
    <>
      <h1>Éditeur MarkDown</h1>
      
      <div className="editor-layout">
      <MarkdownEditor value={activeFile.content} onChange={changeContent} />
      <MarkdownPreview text={activeFile.content} />
      </div>
     
 
    </>
  );
}