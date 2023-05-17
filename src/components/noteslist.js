import useContextGetter from "../hooks/contextGetter";
import NoteItem from "./noteitem";
import '../styles/notes.css';

function Noteslist() {
    
    const context = useContextGetter();

    return (
        <ul >
            {/* map through items to access single note for display */}

            {context.state.notes.map((note, index) => {
                return (
                    <NoteItem
                        key={index}
                        note={note}                     
                    />
                )
            })}
        </ul>
    )
}

export default Noteslist;