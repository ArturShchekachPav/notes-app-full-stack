import './EditNotePopup.css';

const EditNotePopup = () => {
    return (
        <section className="edit-note-popup">
            <form className="edit-note-popup__form">
                <select name="" id=""></select>
                <select name="" id=""></select>
                <button type="button"></button>
                <button type="submit"></button>
                <input type="text" placeholder="Header"/>
                <textarea name="" id="" cols="30" rows="10" placeholder="Введите текст"></textarea>
            </form>
        </section>
    );
};

export default EditNotePopup;