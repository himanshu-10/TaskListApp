import { createContext, useReducer } from "react";

//allow for use of Context API in app
export const AppContext = createContext();

//reducer function - define all state actions
function reducer(appstate, action) {
    //copy of state
    let appStateCopy = { ...appstate };
    //set name of copy action to action
    appStateCopy.action = action;

    //add new item
    if (action.type === 'ADD_ITEM') {
        if (appStateCopy.isEditing) {
            appStateCopy.notes = appStateCopy.notes.map(note => {
                if (note.id === appStateCopy.currentlyEditing) {
					note.title = appStateCopy.title;
                    note.description = appStateCopy.description;
                    localStorage.setItem('notes', JSON.stringify(appStateCopy.notes))
				}
                return note;
            })
            appStateCopy.isEditing = false;
        } else {
            //to prevent addition of duplicate items, check if index is same, and if they aren't the same, add item
            const index = appStateCopy.notes.findIndex(el => el.id === action.payload.id);
            if (index === -1) {
                appStateCopy.notes.unshift(action.payload);
                localStorage.setItem('notes', JSON.stringify(appStateCopy.notes))
            }
        }
    }

    //set userLoggedIn to true and userdata to payload(what is keyed/data)
    if (action.type === 'LOGIN') {
        appStateCopy.isUserLoggedIn = true;
        appStateCopy.userData = action.payload;
    }

    //set userLoggedIn to false and userdata back to null in logout
    if (action.type === 'LOGOUT') {
        appStateCopy.isUserLoggedIn = false;
        appStateCopy.userData = null;
    }

    //reset inputs to empty
    if (action.type === 'RESET_INPUTS') {
		appStateCopy.title = '';
		appStateCopy.description = '';
    }
    
    // update title to edit
	if (action.type === 'UPDATE_TITLE') {
		appStateCopy.title = action.payload;
	}

	// update desc to edit
	if (action.type === 'UPDATE_DESCRIPTION') {
		appStateCopy.description = action.payload;
	}

    //delete item
    if (action.type === 'DELETE_NOTE') {
        appStateCopy.notes = appStateCopy.notes.filter(note => note.id !== action.payload.id);

        let items = JSON.parse(localStorage.getItem('notes'));
        let newItem = items.filter(item => item.id !== action.payload.id);
        localStorage.setItem('notes', JSON.stringify(newItem))
    }

    if (action.type === 'EDIT_NOTE') {
        appStateCopy.title = action.payload.title;
		appStateCopy.description = action.payload.description;
		appStateCopy.isEditing = true;
		appStateCopy.currentlyEditing = action.payload.id;
    }

    return appStateCopy;
}

const getLocalStorage = () => {
  let listNotes = localStorage.getItem('notes');
  if (listNotes) {
    return JSON.parse(localStorage.getItem('notes'))
  }
  else {
    return []
  }
}

//initialState object
const initialState = {
    notes: getLocalStorage(), //notes state stored in array
    isUserLoggedIn: false, //state to check whether user is logged in
    userData: null, //check whether user data is null on logout
    title: '',
    description: '',
    isEditing: false,
	currentlyEditing: '',
}

function AppState({children}) {

    //useReducer
    const [appstate, dispatch] = useReducer(reducer, initialState);

    //value passed to context for use in other components
    const contextObject = {
        state: appstate,
        dispatch: dispatch
    };
    
    return (
        <AppContext.Provider value={contextObject} >
            {children}
        </AppContext.Provider>
    )
}

export default AppState;