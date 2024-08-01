import './Notes.css';
import Note from "../Note/Note";
import Search from "../Search/Search";
import Lists from "../Lists/Lists";
import Masonry from "react-masonry-css";
import {useEffect, useState} from "react";

function Notes({notes, lists}) {
    const [selectedList, setSelectedList] = useState({title: null, id: null});
    const [foundNotes, setFoundNotes] = useState(notes);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        let filteredNotes;

        if(selectedList.id === null) {
            filteredNotes = notes;
        } else {
            filteredNotes = notes.filter(note => note.list === selectedList.id);
        }

        if(searchText !== "") {
            filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()));
        }

        setFoundNotes(filteredNotes);
    }, [selectedList, notes, searchText]);

    return (
        <section className="notes">
            <Search setSearchText={setSearchText}  />
            <Lists selectedList={selectedList} setSelectedList={setSelectedList} lists={lists} />
            < Masonry
                breakpointCols = {2}
                className = "notes__grid"
                columnClassName = "notes__grid_column" >
                {foundNotes.map(note => <Note key={note.id} note={note} /> )}
            < / Masonry >
            <button className="notes__add-button"></button>
        </section>
    );
}

export default Notes;