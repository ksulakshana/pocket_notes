import React,{useEffect, useState} from 'react'
import styles from './HomePage.module.css';
import HomeUnselectedNotes from '../components/HomeUnselectedNotes';
import HomeSelectedNote from '../components/HomeSelectedNote';
import ModalDisplay from '../components/ModalDisplay';
function HomePage() {
  const notes = JSON.parse(localStorage.getItem("noteList")) || null;
  const [getResultsForId,SetGetResultsForId] = useState(localStorage.getItem("showResults") || "");

  const goToHome = () => {
    SetGetResultsForId("");
    localStorage.setItem("showResults","");
  }

  /**********NoteList Compoennt JS*************** */

  
  const [openModal,setOpenModal] = useState(false);

  sessionStorage.setItem("showResults",getResultsForId);

  const handleModalOpen = () =>{
      setOpenModal(true);
  }

  function showNotes(Idcount)
  {
      SetGetResultsForId(Idcount);
      localStorage.setItem("showResults",Idcount);
  }

  /**********NoteList Compoennt JS*************** */

  return (
    <div className={styles.container}>
      <div className={styles.noteListSection}>
        <div className={styles.headingDiv}>
          <h3 className={styles.heading} onClick={goToHome}>Pocket Notes</h3>
        </div>

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
        {openModal && <ModalDisplay openModal={openModal} closeModal={setOpenModal}/>} 
    </div>
    
      </div>
        {getResultsForId?<HomeSelectedNote id={getResultsForId} data={notes}/>:<HomeUnselectedNotes/>}
    </div>
  )
}
export default HomePage
