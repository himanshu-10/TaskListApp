import { Link } from 'react-router-dom';
import useContextGetter from '../hooks/contextGetter';
import '../styles/navbar.css';

function Navbar() {

    const context = useContextGetter();

    //logout dispatch function
    const logout = () => {
        context.dispatch({type: 'LOGOUT'})
    }

    return (
        <nav className='navbar'>
            
            <h3 className='logo'>Notes App</h3>

            {/* if user is logged in, then navbar shows notes and logout link */}
            {context.state.isUserLoggedIn && (
                <>
                    <Link to='/notes' className='notes-link'>Notes</Link>
                    <span onClick={logout} className='logout-link'>Log Out</span>
                </>
            )}

        </nav>
    )
}

export default Navbar;