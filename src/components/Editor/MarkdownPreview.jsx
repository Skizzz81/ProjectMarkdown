import { marked } from "marked";

export default function MarkdownPreview({ text }) {

    return (

        <div className="preview-container">
            <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
        </div>

    );

}