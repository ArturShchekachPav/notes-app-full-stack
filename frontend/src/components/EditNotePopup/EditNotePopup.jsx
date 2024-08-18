import './EditNotePopup.css';
import SelectInput from "../SelectInput/SelectInput";
import {useForm} from "react-hook-form";
import TextEditor, {useEditorApi} from "../TextEditor/index.ts";
import ToolPanel from "../ToolPanel/index.ts";

const EditNotePopup = ({note, lists, colors, isPopupOpen, onPopupClose}) => {
    const {
        handleSubmit,
        control,
        register,
        reset
    } = useForm({defaultValues: {
            title: note.title,
            list: lists.find(list => list.label === note.list),
            color: colors.find(color => color.label === note.color)
        }});

    const {toHtml} = useEditorApi();

    function onSaveNote(data) {
        console.log({...data, content: toHtml()});
        onPopupClose();
        reset();
    }

    return (
        <section className={`edit-note-popup ${isPopupOpen && 'edit-note-popup_open'}`} onClick={(e) => {
            if(e.target === e.currentTarget) {
                onPopupClose();
                reset();
            }
        }}>
            <form onSubmit={handleSubmit(onSaveNote)} className="edit-note-popup__form" noValidate>
                <fieldset className="edit-note-popup__settings">
                    <button type="button" className="edit-note-popup__button-back" onClick={() => {
                        onPopupClose();
                        reset();
                    }}></button>
                    <SelectInput control={control} name='list' options={lists} />
                    <SelectInput control={control} name='color' options={colors} />
                    <button type="button" className="edit-note-popup__button-delete"></button>
                    <button type="submit" className="edit-note-popup__button-save"></button>
                </fieldset>
                <input type="text" placeholder="Header" className="edit-note-popup__input-title" {...register('title')}/>
                    <ToolPanel />
                    <TextEditor />
            </form>
        </section>
    );
};

export default EditNotePopup;