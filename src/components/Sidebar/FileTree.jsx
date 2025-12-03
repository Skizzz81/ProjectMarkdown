export default function FileTree({ files, activeFileId,onFileSelect }) {
  return (
    <div>
      {files.map(file => (   
        <div   
          key={file.id} 
          onClick={() => onFileSelect(file.id)}
          className={`file-item ${activeFileId === file.id ? 'active' : ''}`}
        >
          {file.type === 'folder' ? '📁' : '📄'} {file.name}
        </div>
      ))}
    </div>
  );
}