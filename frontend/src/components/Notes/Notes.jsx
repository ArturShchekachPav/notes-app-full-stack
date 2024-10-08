import './Notes.css';
import Note from "../Note/Note";
import Search from "../Search/Search";
import Lists from "../Lists/Lists";
import Masonry from "react-masonry-css";
import {useEffect, useState} from "react";

function Notes({notes, lists, onEditNotePopupOpen, onCreateNote, onDeleteNote, onCreateList, onDeleteList, onEditList}) {
    const [selectedList, setSelectedList] = useState({title: null, id: null});
    const [foundNotes, setFoundNotes] = useState(notes);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        let filteredNotes;

        if(selectedList.id === null) {
            filteredNotes = notes;
        } else {
            filteredNotes = notes.filter(note => note.list === selectedList.title);
        }

        if(searchText !== "") {
            filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()));
        }

        setFoundNotes(filteredNotes);
    }, [selectedList, notes, searchText]);

    const handleCreateNoteButtonClick = () => {
        return onCreateNote()
            .then(createdNote => onEditNotePopupOpen(createdNote))
            .catch(console.log);
    }

    return (
        <section className="notes">
            <Search setSearchText={setSearchText}  />
            <Lists selectedList={selectedList} setSelectedList={setSelectedList} lists={lists} onCreateList={onCreateList} onDeleteList={onDeleteList} onEditList={onEditList}/>
            < Masonry
                breakpointCols = {2}
                className = "notes__grid"
                columnClassName = "notes__grid_column" >
                {foundNotes.map(note => <Note key={note.id} note={note} onEditNotePopupOpen={onEditNotePopupOpen} onDeleteNote={onDeleteNote}/> )}
            < / Masonry >
            <button className="notes__add-button" onClick={handleCreateNoteButtonClick}></button>
        </section>
    );
}

export default Notes;