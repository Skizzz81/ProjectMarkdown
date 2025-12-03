import { marked } from "marked";

export default function MarkdownPreview({ text }) {

    return (
            <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    );

}