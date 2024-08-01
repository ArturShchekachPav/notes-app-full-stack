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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditNotePopup from "../EditNotePopup/EditNotePopup";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState({title: null});
    const [currentUser, setCurrentUser] = useState({});
    const [notes, setNotes] = useState([]);
    const [notesLists, setNotesLists] = useState([]);

    const getUser = () => Promise.resolve(USER_DATA);
    const getNotes = () => Promise.resolve(NOTES);
    const getLists = () => Promise.resolve(LISTS);

    const getProfileData = () => Promise.all([getUser(), getLists(), getNotes()]).then(([user, lists, notes]) => {
       setCurrentUser(user);
       setNotes(notes);
       setNotesLists(lists);
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

  return (
    <div className="app">
        <Header user={currentUser} />
        <main>
            <Routes>
                <Route path="/sing-up" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <LogIn />} />
                <Route path="/sing-in" element={isLoggedIn ? <Navigate to="/" replace={true} /> : <LogIn />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile user={currentUser} />} isLoggedIn={isLoggedIn} />} />
                <Route path="/" element={<ProtectedRoute element={<>
                    <Notes lists={notesLists} notes={notes} />
                    <EditNotePopup />
                </>} isLoggedIn={isLoggedIn} />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;
