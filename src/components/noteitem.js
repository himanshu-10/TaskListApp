import useContextGetter from "../hooks/contextGetter";
import { FaTrash, FaEdit } from 'react-icons/fa'; //import react icons
import { useHistory } from 'react-router';
import '../styles/notes.css';

function NoteItem({ note, index }) {
    
    const history = useHistory();
    const context = useContextGetter();

    // push to note-item
    const handleItem = () => {
        //set context  to mapped note for displaying
        context.state.title = note.title;
        context.state.description = note.description;
        history.push('/note-item')
    }

    const deleteNote = () => {
		context.dispatch({type: 'DELETE_NOTE', payload:note})
    }

    const editNote = () => {
        history.push('/form')
        context.dispatch({type: 'EDIT_NOTE', payload:note})
    }

    return (
        <li className='note-div' index={note.id} >
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <p className='more-link' onClick={handleItem}>Click here for more</p>
            <div className='note-btn'>
                {/* react icons for delete and edit */}
                <FaTrash onClick={deleteNote} className='delete-btn' />
                <FaEdit onClick={editNote} className='edit-btn' />
            </div> 
        </li>
    ) 
}

export default NoteItem;