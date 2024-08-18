import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Notes from "../Notes/Notes";
import Profile from "../Profile/Profile";
import LogIn from "../LogIn/LogIn";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import USER_DATA from "../../data/users-data.json";
import NOTES from "../../data/notes-data.json";
import LISTS from "../../data/lists-data.json";
import COLORS from "../../data/colors-data.json";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditNotePopup from "../EditNotePopup/EditNotePopup";
import {TextEditorProvider} from "../TextEditor/index.ts";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [notes, setNotes] = useState([]);
    const [notesLists, setNotesLists] = useState([]);
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false);
    const [notesColors, setNotesColors] = useState([]);
    const [editingNote, setEditingNote] = useState({});

    const getUser = () => Promise.resolve(USER_DATA);
    const getNotes = () => Promise.resolve(NOTES);
    const getLists = () => Promise.resolve(LISTS);
    const getColors = () => Promise.resolve(COLORS);

    const getProfileData = () => Promise.all([getUser(), getLists(), getNotes(), getColors()]).then(([user, lists, notes, colors]) => {
       setCurrentUser(user);
       setNotes(notes);
       setNotesLists(lists);
       setNotesColors(colors);
       setIsLoggedIn(true);
    }).catch(err => {
        setIsLoggedIn(false);
        return Promise.reject(err);
    });

    useEffect(() => {
        getProfileData().catch(err => console.log(err));
    });

    if (isLoggedIn === null) {
        return (
            <div className="App">
                <h1>Загрузка...</h1>
            </div>
        );
    }

    if (isLoggedIn === false) {
        return (
            <div className="App">
                <h1>Ошибка авторизации</h1>
            </div>
        );
    }

    const onEditNotePopupOpen = (noteData) => {
        setEditingNote(noteData);
        setIsEditNotePopupOpen(true);
    };

    const onPopupClose = () => {
        setIsEditNotePopupOpen(false);
    }

  return (
    <div className="app">
        <Header user={currentUser} />
        <main>
            <Routes>
                {/*<Route path="/sing-up" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <LogIn />} />*/}
                {/*<Route path="/sing-in" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <LogIn />} />*/}
                {/*<Route path="/profile" element={<ProtectedRoute element={<Profile user={currentUser} />} isLoggedIn={isLoggedIn} />} />*/}
                <Route path="/" element={<ProtectedRoute element={<>
                    <Notes lists={notesLists} notes={notes} onEditNotePopupOpen={onEditNotePopupOpen} />
                    {isEditNotePopupOpen &&
                    <TextEditorProvider html={editingNote.content}>
                        <EditNotePopup lists={[...notesLists.map((list) => {
                            return {value: list.title, label: list.title}
                        }), {value: '', label: 'All'}]} colors={notesColors.map((color) => {
                            return {label: color.title, value: color.hex}
                        })} note={editingNote} onPopupClose={onPopupClose} isPopupOpen={isEditNotePopupOpen}/>
                    </TextEditorProvider>}
                </>} isLoggedIn={isLoggedIn} />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;
