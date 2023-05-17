import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { MdAddCircle } from 'react-icons/md';
import useContextGetter from '../hooks/contextGetter';
import Noteslist from './noteslist';
import '../styles/notes.css';

function Notes() {

    const history = useHistory();
    const context = useContextGetter();

    //prevent user from getting to notes page if already logged out
    //changes on context.state and history change
    useLayoutEffect(() => {
        if (!context.state.isUserLoggedIn) {
            //take back to login page
            history.push('/login')
        }
    }, [context.state, history])

    const handleAddItem = () => {
        history.push('/form');
    }

    return (
        <div style={{textAlign:'center'}}>
            <Noteslist />
            <button onClick={handleAddItem} className='add-note-btn'><MdAddCircle /></button>
        </div>
    )
}

export default Notes;


