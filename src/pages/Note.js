import useContextGetter from "../hooks/contextGetter";
import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import '../styles/notes.css';

function Note() {

    const context = useContextGetter();
    const history = useHistory();

    //prevent user from getting to notes page if already logged out
    //changes on context.state and history change
    useLayoutEffect(() => {
        if (!context.state.isUserLoggedIn) {
            //take back to login page
            history.push('/login')
        }
    }, [context.state, history])

    return (
        <div className='note'>
            <div className='note-item'>
                <h2>{context.state.title}</h2>
                <p>{context.state.description}</p>
            </div>
            <Link to='/notes' className='back-link'><FaArrowLeft /> Go back</Link>
        </div>
    )
}

export default Note;