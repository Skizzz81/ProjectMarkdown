import { useState } from "react";

import MarkdownEditor from "./components/Editor/MarkdownEditor";
import MarkdownPreview from "./components/Editor/MarkdownPreview";
import "./App.css";


export default function App() {
  const [text, setText] = useState("");

  return (
    <>
      <h1>Éditeur MarkDown</h1>
      
      <div className="editor-layout">
      <MarkdownEditor value={text} onChange={setText} />
      <MarkdownPreview text={text} />
      </div>
     
 
    </>
  );
}