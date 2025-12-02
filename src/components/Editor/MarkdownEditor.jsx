export default function MarkdownEditor({ value, onChange }) {
  return (

    <div className="editor-container">
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    </div>
  );
}