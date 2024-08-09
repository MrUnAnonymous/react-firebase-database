import React, { useState } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Write = () => {
    const navigate = useNavigate();
    let [fruitName, setFruitName] = useState('');
    let [fruitDescription, setFruitDescription] = useState('');

    const saveData = async() => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "nature/fruits"));
        set(newDocRef, {
            name: fruitName,
            description: fruitDescription,
        }).then(() => {
            alert("data saved");
        }).catch((error) => {
            alert("error", error.message);
        })
    }

  return (
    <div>

        <h1>Write Page</h1>

        <input type='text' value={fruitName} onChange={(e) => setFruitName(e.target.value)} />
        <input type='text' value={fruitDescription} onChange={(e) => setFruitDescription(e.target.value)} />
        <br/>

        <button onClick={saveData}>Save Data</button> <br />

        <button className='button1' onClick={ () => navigate("/read") } >Home Page</button> <br />
        <button className='button1' onClick={ () => navigate("/updateread") } >Update List</button>
    </div>
  )
}

export default Write