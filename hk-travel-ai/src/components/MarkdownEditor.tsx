import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { Components } from 'react-markdown';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor')
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownComponents: Components = {
  img: ({ node, ...props }) => <img className="pt-2 max-w-full" {...props} />,
  a: ({ node, ...props }) => (
    <a
      className="text-blue-500 underline hover:text-blue-700 mx-1"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  p: ({ node, ...props }) => <div className="my-2 text-sm sm:text-base" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2 ml-1" {...props} />,
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return <SimpleMDE
    value={value}
    onChange={onChange}
  />;
}