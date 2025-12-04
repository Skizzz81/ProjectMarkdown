export default function MarkdownEditor({ value, onChange }) {
  return (

    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Écrivez ici votre contenu en Markdown..."
    />
    
  );
}