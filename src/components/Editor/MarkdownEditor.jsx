import { useRef } from 'react';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

export default function MarkdownEditor({ value, onChange }) {
  const text_area_ref = useRef(null);

  // Using the custom hook to handle keyboard shortcuts
  useKeyboardShortcuts(text_area_ref, onChange);

  return (
    <textarea 
      ref         = {text_area_ref}
      value       = {value}
      onChange    = {(e) => onChange(e.target.value)}
      placeholder ="Écrivez ici votre contenu en Markdown..."
    />
  );
};