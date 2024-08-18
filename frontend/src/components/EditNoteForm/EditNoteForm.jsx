import './EditNoteForm.css';
import SelectInput from "../SelectInput/SelectInput";
import ToolPanel from "../ToolPanel/ToolPanel.tsx";
import TextEditor from "../TextEditor/TextEditor.tsx";
import {useForm} from "react-hook-form";

const EditNoteForm = ({note, lists, colors, onPopupClose}) => {
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

    function onSaveNote(data) {
        console.log(data);
        onPopupClose();
        reset();
    }

    return (
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
    );
};

export default EditNoteForm;