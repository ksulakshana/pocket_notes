import React, { useState, useEffect } from 'react';
import styles from './NotesList.module.css';
import ModalDisplay from './ModalDisplay';
import HomeSelectedNote from './HomeSelectedNote';
import HomeUnselectedNotes from './HomeUnselectedNotes';
function NotesList() {

    const [openModal,setOpenModal] = useState(false);
    const notes = JSON.parse(localStorage.getItem("noteList")) || null;
    const [showResults, setShowResults] = useState(localStorage.getItem("showResults") || "");

    sessionStorage.setItem("showResults",showResults);

    const handleModalOpen = () =>{
        setOpenModal(true);
    }
    const handleModalClose = () =>{
        setOpenModal(false);
    }
    function showNotes(Idcount)
    {
        setShowResults(Idcount);
        localStorage.setItem("showResults",Idcount);
    }
    useEffect(() => {
        if(showResults != ''){
            setShowResults(localStorage.getItem("showResults"));
        }
      });
  return (
    <div className={styles.container1}>
    {
        notes?.map((note,index) => (
            <div className={styles.subcontainer}>
                <p id={index}>
                    <span className={styles.noteabbreviation} style={{background:note['color1'].replace(/['"]+/g, '')}} onClick={() => showNotes(note['id'].replace(/['"]+/g, ''))}>{note['abbreviation'].replace(/['"]+/g, '')}</span>
                    <span className={styles.noteName} onClick={() => showNotes(note['id'].replace(/['"]+/g, ''))}>{note['inputValue1'].replace(/['"]+/g, '')} </span>
                </p>
            </div>
    ))}
            
        <div className={styles.addNewDiv}>
          <p className={styles.addNewButton}>
            <span onClick={handleModalOpen}>+</span>
          </p>
        </div>
        {openModal && <ModalDisplay closeModal={setOpenModal}/>} 
    </div>
  )
}

export default NotesList
