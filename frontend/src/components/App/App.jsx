import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Notes from "../Notes/Notes";
import Profile from "../Profile/Profile";
import LogIn from "../LogIn/LogIn";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditNotePopup from "../EditNotePopup/EditNotePopup";
import {TextEditorProvider} from "../TextEditor/index.ts";
import Register from '../Register/Register.jsx';
import api from '../utils/api';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [notes, setNotes] = useState([]);
    const [notesLists, setNotesLists] = useState([]);
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false);
    const [notesColors, setNotesColors] = useState([]);
    const [editingNote, setEditingNote] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getProfileData = () => Promise.all([api.getProfileData(), api.getLists(), api.getNotes(), api.getColors()])
        .then(([user, lists, notes, colors]) => {
            setCurrentUser(user);
            setNotes(notes);
            setNotesLists(lists);
            setNotesColors(colors);

            setIsLoggedIn(true);
        })
        .catch(err => {
            setIsLoggedIn(false);
            return Promise.reject(err);
        });

    const handleTokenCheck = () => {
        getProfileData()
            .catch(err => console.log(err));
    };

    useEffect(() => {
        handleTokenCheck();
    }, [])

    if (isLoggedIn === null) {
        return (
            <div className="App">
                <h1>Загрузка...</h1>
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
                <Routes>
                    <Route path="/sing-in" element={isLoggedIn ? <Navigate to="/" replace={true}/> : <LogIn getProfileInfo={getProfileData} isLoading={isLoading} setIsLoading={setIsLoggedIn}/>}/>
                    <Route path="/sing-up" element={isLoggedIn ? <Navigate to="/" replace={true}/> : <Register getProfileInfo={getProfileData} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
                    <Route path="/profile"
                           element={<ProtectedRoute element={
                               <Profile user={currentUser}>
                                   <Header user={currentUser}/>
                           </Profile>
                           } isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/" element={<ProtectedRoute element={<>
                        <Header user={currentUser}/>
                        <main>
                            <Notes lists={notesLists} notes={notes} onEditNotePopupOpen={onEditNotePopupOpen}/>
                            {isEditNotePopupOpen &&
                                <TextEditorProvider html={editingNote.content}>
                                    <EditNotePopup lists={[...notesLists.map((list) => {
                                        return {value: list.title, label: list.title}
                                    }), {value: '', label: 'All'}]} colors={notesColors.map((color) => {
                                        return {label: color.title, value: color.hex}
                                    })} note={editingNote} onPopupClose={onPopupClose} isPopupOpen={isEditNotePopupOpen}/>
                                </TextEditorProvider>}
                        </main>
                    </>} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
        </div>
    );
}

export default App;
