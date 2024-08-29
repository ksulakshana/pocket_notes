import React, { useState,useEffect } from 'react'
import styles from './HomeSelectedNote.module.css';
import NoteContent from './NoteContent';
import NotesList from './NotesList';

function HomeSelectedNote(props) {
const [showResults, setShowResults] = useState(localStorage.getItem("showResults") || "");
const [text,setText] = useState("");
const filterednotes = props.data.filter(note => note.id === props.id);
const enabled = text.length > 0;
const [contentCount, setContentCount] = useState( 0);
const [noteContent,setNoteContent] = useState(JSON.parse(localStorage.getItem("noteContent")) || []);

let noteId = 0;
let date ='';


    const changeTextHandler = (e) =>{
        setText(e.target.value);
    }
    const submitHandler = () => {

        if(contentCount == 0 && localStorage.getItem('ContentIdcount') == null){
            setContentCount(contentCount + 1);
            localStorage.setItem('ContentIdcount',contentCount);
        }
        else{
            noteId = eval(localStorage.getItem('ContentIdcount').replace(/['"]+/g, '')) + 1;
            setContentCount(localStorage.getItem('ContentIdcount').replace(/['"]+/g, '') + 1);
            localStorage.setItem('ContentIdcount',noteId);
        }

        date = new Date().toLocaleString("en-US", {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})
       
        if(JSON.stringify(localStorage.getItem("noteContent")) === "null"){
            setNoteContent([
                { 
                    id: localStorage.getItem('ContentIdcount'),
                    contentNoteId:props.id,
                    noteDescription:text,
                    date:date 
                }
              ],noteContent);
        }else{
            setNoteContent([
                ...noteContent,
                { 
                    id: localStorage.getItem('ContentIdcount'),
                    contentNoteId:props.id,
                    noteDescription:text,
                    date:date
                 }
              ],noteContent);
        }
        localStorage.setItem('noteContent', JSON.stringify(noteContent));
        setText('');
    }

    useEffect(() => {
       setShowResults(props.id);
        if(showResults != "")
        {
            setShowResults(localStorage.getItem("showResults"));
        }
        localStorage.setItem('noteContent', JSON.stringify(noteContent));

    });

return (
    <div className={styles.container}>
    {filterednotes.map(note => (
        <div className={styles.subContainer}>
            <p>
                <span className={styles.noteabbreviation} style={{background:note['color1'].replace(/['"]+/g, '')}}>{note.abbreviation}</span>
                <span className={styles.noteName}>{note['inputValue1'].replace(/['"]+/g, '')}</span>
            </p>
        </div>
    ))}
        <NoteContent newdata={noteContent} noteId={props.id}/>

        <div className={styles.newNoteEnter}>
            <div className={styles.enterText}>
                <textarea 
                    className={styles.textArea}  
                    placeholder='Enter your text here...........' 
                    value={text}
                    maxLength={300}
                    onChange={changeTextHandler}
                    onClick={()=>setText('')}
                />
                
                <button className={styles.submitBtn} onClick={submitHandler} disabled = {!enabled}> 
                {enabled?
                <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#001F8B"/>
                </svg>
                :
                <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#ABABAB"/>
                    </svg>
                }
                </button> 
            </div>

        </div>
    </div>
  )
}

export default HomeSelectedNote
