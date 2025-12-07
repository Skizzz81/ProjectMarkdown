import { useEffect }    from 'react';
import { useSelector }  from 'react-redux';

/**
 * Hook used to handle keyboard shortcuts within a text area.
 * @param {React.RefObject} textareaRef - Reference to the text area.
 * @param {function} onShortcutExecuted - Callback when a shortcut is used.
 */
export const useKeyboardShortcuts = (textareaRef, onShortcutExecuted) => {
    const shortcuts = useSelector(state => state.shortcuts.shortcuts);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Handling modifier keys and main key
            const parts = [];
            if(e.ctrlKey){parts.push('Ctrl');};
            if(e.altKey){parts.push('Alt');};
            if(e.shiftKey){parts.push('Shift');};
            if(e.key && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift'){parts.push(e.key.toUpperCase());};

            const pressedShortcut = parts.join('+');

            // Looking for a matching shortcut
            const matchedShortcut = shortcuts.find(s => s.shortcut === pressedShortcut);

            if(matchedShortcut && textareaRef?.current){
                e.preventDefault();
                
                const text_area     = textareaRef.current;
                const start         = text_area.selectionStart;
                const end           = text_area.selectionEnd;
                const text          = text_area.value;
                const selectedText  = text.substring(start, end);

                // Inserting the shortcut content
                const newContent = 
                    text.substring(0, start)    +
                    matchedShortcut.content     +
                    selectedText                +
                    text.substring(end)
                ;

                onShortcutExecuted(newContent);

                // Repositioning the cursor
                setTimeout(() => {
                    text_area.focus();
                    const newCursorPos = start + matchedShortcut.content.length;
                    text_area.setSelectionRange(newCursorPos, newCursorPos);
                }, 0);
            }
        };

        const text_area = textareaRef?.current;
        if(text_area){
            text_area.addEventListener('keydown', handleKeyDown);
            return () => text_area.removeEventListener('keydown', handleKeyDown);
        };
    }, [shortcuts, textareaRef, onShortcutExecuted]);
};

export default useKeyboardShortcuts;
