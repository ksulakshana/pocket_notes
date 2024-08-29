import React, {useState , useEffect, useRef} from 'react'
import styles from './ModalDisplay.module.css';

function ModalDisplay({openModal,closeModal}) {

    const [inputValue, setInputValue] = useState('');
    const [color, setColor] = useState(JSON.parse(localStorage.getItem("color")) || null);
    const [noteList,setNoteList] = useState(JSON.parse(localStorage.getItem("noteList")) || []);
    const [count, setCount] = useState(localStorage.getItem("count") || 0);
    
    let noteId = 0;
    let abbreviation = '';
    let date = '';

    let modalRef = useRef();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleColorClick = (event) => {
        setColor(event.target.getAttribute('value'));
    }  
      
    const saveNewNote = (event) =>{

        if(inputValue == '' || color == ''){
            alert("please enter the valid information");
            return;
        }
        if(count == 0 && localStorage.getItem('Idcount') == null){
            setCount(count + 1);
            localStorage.setItem('Idcount',count);
        }
        else{
            noteId = eval(localStorage.getItem('Idcount').replace(/['"]+/g, '')) + 1;
            setCount(localStorage.getItem('Idcount').replace(/['"]+/g, '') + 1);
            localStorage.setItem('Idcount',noteId);
        }
        localStorage.setItem('inputValue', JSON.stringify(inputValue));
        localStorage.setItem('color', JSON.stringify(color));
        localStorage.setItem('noteList', JSON.stringify(noteList));
        
        if(localStorage.getItem('inputValue').replace(/['"]+/g, '').trim().split(' ').length > 1)
        {
            let val = localStorage.getItem('inputValue').replace(/['"]+/g, '');
            abbreviation = val.split(" ")[0][0] + val.split(" ")[1][0]
            // abbreviation = localStorage.getItem('inputValue').replace(/['"]+/g, '').slice(0,2);
            localStorage.setItem('abbreviation',abbreviation);
        }
        else{
            abbreviation = localStorage.getItem('inputValue').replace(/['"]+/g, '').slice(0,2);
            localStorage.setItem('abbreviation',abbreviation);
        }

        date = new Date().toLocaleString();

        if(JSON.stringify(localStorage.getItem("noteList")) === "null"){
            setNoteList([
                { id: localStorage.getItem('Idcount'), abbreviation:abbreviation, inputValue1: localStorage.getItem('inputValue'), color1:localStorage.getItem('color'), date:date }
              ],noteList);
        }else{
            setNoteList([
                ...noteList,
                { id: localStorage.getItem('Idcount'), abbreviation:abbreviation ,inputValue1: localStorage.getItem('inputValue'), color1:localStorage.getItem('color'), date:date }
              ],noteList);
        }
        // localStorage.setItem('noteList', JSON.stringify(noteList));
        setTimeout(function() {closeModal(false);}, 1000);
    }

    function checkClickOutside(e){

        if({openModal} && modalRef.current && !modalRef.current.contains(e.target)){
            closeModal(false);
        }
    }
    
    useEffect(() => {
        localStorage.setItem('noteList', JSON.stringify(noteList));
        document.addEventListener('mousedown',checkClickOutside);
      });
  return (
    <div className={styles.container} >
        <div className={styles.modalContainer} ref={modalRef}>
            <div className={styles.title}>
                <h3 className={styles.heading}>Create New group</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.groupNameDiv}>
                    <label>Group Name</label>
                    <input
                    type="text" 
                    placeholder="Enter group name"
                    value={inputValue}
                    onChange={handleInputChange} required/>
                </div>
                <div className={styles.chooseColorDiv}>
                    <label>Choose colour</label>
                    <ul required>
                        <li className={styles.purple} value="#B38BFA" onClick={handleColorClick}></li>
                        <li className={styles.pink} value="#FF79F2" onClick={handleColorClick}></li>
                        <li className={styles.aqua} value="#43E6FC" onClick={handleColorClick}></li>
                        <li className={styles.brown} value="#F19576" onClick={handleColorClick}></li>
                        <li className={styles.blue} value="#0047FF" onClick={handleColorClick}></li>
                        <li className={styles.lblue} value="#6691FF" onClick={handleColorClick}></li>
                    </ul>
                </div>
            </div>
            <div className={styles.createButton}>
                <button className={styles.createBtn} onClick={saveNewNote}>Create</button>
            </div>
        </div>
    </div>
  )
}

export default ModalDisplay
