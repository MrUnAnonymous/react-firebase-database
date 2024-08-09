import React, { useState } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Read = () => {
    const navigate = useNavigate();

    let [friutArray, setFruitArray] = useState([]);
  
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits");
        const dataSnapshot = await get(dbRef);
        if(dataSnapshot.exists()) {
            setFruitArray(Object.values(dataSnapshot.val()));
        } else {
            alert("error");
        }
    }

    return (
    <div>
        <h1>Fruit List</h1>
        <button onClick={fetchData}>Display Data</button>
        <ul>
            {friutArray.map((item, index) => (
                <li key={index}>
                    {item.name} : {item.description}
                </li>
            ))}
        </ul>
        <button className='button1' onClick={ () => navigate("/") } >Home Page</button> <br />
        <button className='button1' onClick={ () => navigate("/updateread") } >Update List</button>
    </div>
  )
}

export default Read