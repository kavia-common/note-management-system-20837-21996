import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const NoteEditor = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  const handleDelete = () => {
    if (note && note.id) {
      onDelete(note.id);
    }
  };

  return (
    <div class="w-3/4 p-6">
      {note ? (
        <div>
          <input
            type="text"
            value={title}
            onInput={(e) => setTitle(e.target.value)}
            class="w-full text-2xl font-bold p-2 mb-4 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
            placeholder="Note Title"
          />
          <textarea
            value={content}
            onInput={(e) => setContent(e.target.value)}
            class="w-full h-96 p-2 bg-transparent focus:outline-none resize-none"
            placeholder="Start writing..."
          />
          <div class="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleSave}
              class="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              class="bg-error text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center h-full text-gray-500">
          <p>Select a note to view or create a new one.</p>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
