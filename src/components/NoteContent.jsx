import React from 'react'
import styles from './NoteContent.module.css';

function NoteContent(props) {

    if(props.newdata == ""){
    }
    const filterednotes = props.newdata.filter(note => note.contentNoteId === props.noteId).sort((firstItem, secondItem) => secondItem.id - firstItem.id);

  return (
    <div className={styles.container}>
        {filterednotes.map(note => (
            <div className={styles.notes}>
                <p className={styles.content}>
                    {note.noteDescription}
                </p>
                <p className={styles.createdDate}><span>{note.date.substring(0,13).replaceAll(","," ")}</span> 
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill="#353535"/></svg> 
                        <span>{note.date.substring(13).replace(","," ")}</span> </p>
            </div>
        ))}
        
    </div>
  )
}

export default NoteContent
