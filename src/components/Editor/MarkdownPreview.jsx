import { marked } from "marked";
import { useSelector } from 'react-redux';

export default function MarkdownPreview({ text }) {
    const images = useSelector(state => state.images.library);

    // Remplacer les identifiants image:id par le Base64 réel
    const processedText = text.replace(/!\[(.*?)\]\(image:(\d+)\)/g, (match, altText, imageId) => {
        const image = images.find(img => img.id === parseInt(imageId));
        if (image) {
            return `![${altText}](${image.base64})`;
        }
        return match; // Si l'image n'existe pas, garder le texte original
    });

    return (
            <div dangerouslySetInnerHTML={{ __html: marked(processedText) }} />
    );

}