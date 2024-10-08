import './App.css';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
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
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [notes, setNotes] = useState([]);
    const [notesLists, setNotesLists] = useState([]);
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false);
    const [notesColors, setNotesColors] = useState([]);
    const [editingNote, setEditingNote] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({});

    const navigate = useNavigate();

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
    }, []);

    const onEditNotePopupOpen = (noteData) => {
        setEditingNote(noteData);
        setIsEditNotePopupOpen(true);
    };

    const onPopupClose = () => {
        setIsEditNotePopupOpen(false);
    }

    const handleProfileDataUpdate = ({email, name}) => {
        setIsLoading(true);

        api.editProfileData(name,
            email
        )
            .then((newUserData) => {
                setCurrentUser(newUserData);
            })
            .then(() => {
                setIsProfileEditing(false);
                setUpdateStatus({
                    show: true,
                    success: true,
                    message: 'Данные обновлены'
                });
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    };

    const handleCreateNote = () => {
        return api.postNewNote()
            .then(newNote => {
                setNotes([newNote,
                    ...notes
                ]);
            })
            .catch(err => console.log(err));
    };

    const handleUpdateNote = ({id, note, listId, content, colorId}) => {
        return api.editNote(id, note, listId, content, colorId)
            .then((updatedNote) => {
                setNotes((state) => state.map(note => {
                    if(note.id === id) {
                        return updatedNote;
                    }

                    return note;
                }));
            })
            .catch(err => console.log(err));
    };

    const handleDeleteNote = (noteId) => {
        return api.deleteNote(noteId)
            .then(() => {
                setNotes((state) => state.filter((note) => note.id !== noteId));
            })
            .catch(err => console.log(err));
    };

    const handleCreateList = (list) => {
        return api.postNewList(list)
            .then(newList => {
                setNotesLists([newList,
                    ...notesLists
                ]);
            })
            .catch(err => console.log(err));
    };

    const handleUpdateList = ({id, list}) => {
        return api.editList({id, list})
            .then((updatedList) => {
                setNotesLists((state) => state.map(list => {
                    if(list.id === id) {
                        return updatedList;
                    }

                    return list;
                }));
            })
            .catch(err => console.log(err));
    };

    const handleDeleteList = (listId) => {
        return api.deleteList(listId)
            .then(() => {
                setNotesLists((state) => state.filter((list) => list.id !== listId));
            })
            .catch(err => console.log(err));
    };

    const handleSingOut = () => {
        return api.singOut()
            .then(() => {
                setIsLoggedIn(false);
                navigate('/',
                    {replace: true}
                );
            })
            .catch(err => {
                console.log(err);
            });

    }

    if (isLoggedIn === null) {
        return (
            <div className="App">
                <h1>Загрузка...</h1>
            </div>
        );
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Routes>
                    <Route path="/sing-in" element={isLoggedIn ? <Navigate to="/" replace={true}/> : <LogIn getProfileInfo={getProfileData} isLoading={isLoading} setIsLoading={setIsLoggedIn}/>}/>
                    <Route path="/sing-up" element={isLoggedIn ? <Navigate to="/" replace={true}/> : <Register getProfileInfo={getProfileData} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
                    <Route path="/profile"
                           element={<ProtectedRoute element={
                               <Profile
                                   onSubmit={handleProfileDataUpdate}
                                   isEditing={isProfileEditing}
                                   setIsEditing={setIsProfileEditing}
                                   logOut={handleSingOut}
                                   isLoading={isLoading}
                                   updateStatus={updateStatus}
                               >
                                   <Header user={currentUser}/>
                               </Profile>
                           } isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/" element={<ProtectedRoute element={<>
                        <Header user={currentUser}/>
                        <main>
                            <Notes onDeleteNote={handleDeleteNote} onCreateNote={handleCreateNote} onDeleteList={handleDeleteList} onCreateList={handleCreateList} onEditList={handleUpdateList} lists={notesLists} notes={notes} onEditNotePopupOpen={onEditNotePopupOpen}/>
                            {isEditNotePopupOpen &&
                                <TextEditorProvider html={editingNote.content}>
                                    <EditNotePopup lists={[...notesLists.map((list) => {
                                        return {value: list.list, label: list.list}
                                    }), {value: '', label: 'All'}]} colors={notesColors.map((color) => {
                                        return {label: color.color, value: color.hex}
                                    })} note={editingNote} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote} onPopupClose={onPopupClose} isPopupOpen={isEditNotePopupOpen}/>
                                </TextEditorProvider>}
                        </main>
                    </>} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
