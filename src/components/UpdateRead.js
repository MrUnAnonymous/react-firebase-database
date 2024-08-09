import React, { useState } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const UpdateRead = () => {
  const navigate = useNavigate();

    let [friutArray, setFruitArray] = useState([]);
  
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits");
        const dataSnapshot = await get(dbRef);
        if(dataSnapshot.exists()) {

          const myData = dataSnapshot.val();
          const tempArray = Object.keys(myData).map( myFireId => {
            return {
              ...myData[myFireId],
              id: myFireId,
            }
          })

            setFruitArray(tempArray);
        } else {
            alert("error");
        }
    }

    const deleteItem = async (id) => {
      const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits/" + id);
        await remove(dbRef);
        window.location.reload();
    }

    return (
    <div>
      <h1>Update Read</h1>
        <button onClick={fetchData}>Display Data</button>
        <ul>
            {friutArray.map((item, index) => (
                <li key={index}>
                    {item.name} : {item.description} : {item.id}
                    <button className='button1' onClick={ () => navigate(`/updatewrite/${item.id}`)}>Update</button>
                    <button className='button1' onClick={ () => deleteItem(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
        <button className='button1' onClick={ () => navigate("/") } >Home Page</button> <br />
        <button className='button1' onClick={ () => navigate("/read") } >Read List</button>
    </div>
  )
}

export default UpdateRead