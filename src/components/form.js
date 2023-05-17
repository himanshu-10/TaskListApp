import useContextGetter from '../hooks/contextGetter';
import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import '../styles/add-form.css';

function Form() {

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

    const handleSubmit = (e) => {
        e.preventDefault();

        //if empty
        if (!context.state.title || !context.state.description) {
			return false;
        }
        
        //create new item
        const newItem = {
			title: context.state.title,
			description: context.state.description,
			id: Date.now(),
        };
        //add item dispatch action
        context.dispatch({type: 'ADD_ITEM', payload: newItem});
		// reset the values of the input boxes
		context.dispatch({ type: 'RESET_INPUTS' });
		history.push('/notes');
    }

    //update title to edited item
    const setTitle = e => {
		context.dispatch({
			type: 'UPDATE_TITLE',
			payload: e.target.value,
		});
	};
    //update description to edited desc
	const setDescription = e => {
		context.dispatch({
			type: 'UPDATE_DESCRIPTION',
			payload: e.target.value,
		});
	};

    return (
        <div className='add-form-section'>
			<form onSubmit={handleSubmit} className='add-form'>
				<div className='add-heading'>
                    <h1>Add Note</h1>
				</div>
				<div>
					<label htmlFor='title'>Note Title</label><br/>
					<input
						value={context.state.title}
						onChange={setTitle}
						type='text'
						name='title'
						id='title'
						placeholder='Title'
					/>
				</div>
				<div>
					<label htmlFor='desc'>Description</label><br/>
					<textarea
						type='text'
						value={context.state.description}
						onChange={setDescription}
						name='desc'
						id='desc'
						rows='5'
						placeholder='Description'
					/>
				</div>
				<button className='add-btn' type='submit'>
					{context.state.isEditing ? 'Edit Item' : 'Add Item'}
					
				</button>
            </form>
        </div>
    )
}

export default Form;