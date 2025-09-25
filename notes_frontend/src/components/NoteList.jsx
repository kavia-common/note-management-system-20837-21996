import { h } from 'preact';

const NoteList = ({ notes, onSelectNote, activeNoteId }) => {
  return (
    <div class="w-1/4 bg-surface p-4 overflow-y-auto">
      <h2 class="text-xl font-semibold mb-4">Notes</h2>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            class={`p-2 rounded-lg cursor-pointer mb-2 ${
              activeNoteId === note.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectNote(note.id)}
          >
            <h3 class="font-bold truncate">{note.title || 'New Note'}</h3>
            <p class="text-sm text-gray-500 truncate">{note.content || 'No content'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
