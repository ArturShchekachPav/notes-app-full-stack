import './Note.css';

function Note({note}) {
    return (
        <div className={`note note_color_${note.color}`}>
            <h2 className="note__title">{note.title}</h2>
            <div dangerouslySetInnerHTML={{__html: note.content}}></div>
        </div>
    );
}

export default Note;