import React, { useState, useEffect } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateWrite = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    let [fruitName, setFruitName] = useState('');
    let [fruitDescription, setFruitDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits/" + id);
            const dataSnapshot = await get(dbRef);
            if(dataSnapshot.exists()) {
                const targetObj = dataSnapshot.val();
                setFruitName(targetObj.name);
                setFruitDescription(targetObj.description);
            } else {
                alert("error");
            }
        }
        fetchData();
    }, [id])

    const updateData = async() => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "nature/fruits/" + id);
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

        <h1>Update</h1>

        <input type='text' value={fruitName} onChange={(e) => setFruitName(e.target.value)} />
        <input type='text' value={fruitDescription} onChange={(e) => setFruitDescription(e.target.value)} />
        <br/>

        <button onClick={updateData}>Update Data</button> <br />

        <button className='button1' onClick={ () => navigate("/read") } >Home Page</button> <br />
        <button className='button1' onClick={ () => navigate("/updateread") } >Update List</button>
    </div>
  )
}

export default UpdateWrite