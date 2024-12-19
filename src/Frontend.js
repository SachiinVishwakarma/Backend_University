import React, { useState} from 'react';

function Frontend() {
    const [returnedData, setReturnedData] = useState({});
    const [person, setPerson] = useState({ ID: 0, NAME: '', Mobile_number: 0, STATE: '' });
    const setInput = (e) => {
        const { name, value } = e.target;
        console.log(value);
    
        if (name === 'ID'||name=== 'Mobile_number') {
          setPerson(prevState => ({
            ...prevState,
            [name]: parseInt(value)  
          }));
          return;
        }
        setPerson((prevState )=> ({
          ...prevState,
          [name]: value
        }));
      }

      const getPerson=async()=>{
        const newData=await fetch ('http://localhost:8000/api/getPerson',{
          method:'POST',
          headers:{
            'content-type': 'application/json',
            'Accept': 'application/json'
          },
          body:JSON.stringify({
            ID: person.ID
          })
        })
      }
  const createPerson = async () => {
    console.log('Creating Employee:', person);
    const newData = await fetch('/api/createPerson', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        ...person

      })
    })
      .then(res => res.json());
    console.log(newData);
    setReturnedData(newData[0] || {});
  }
  const deletePerson=async()=>{
    const newData=await fetch ('/api/deletePerson',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body :JSON.stringify({
        ID : person.ID
      })
    }).then(res=>res.json());
    setReturnedData(newData[0]||{});
  }
  const updatePerson = async () => {
    const updatedData = await fetch('/api/updatePerson', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(person)
    })
      .then(res => res.json());
    console.log(updatedData);
    setReturnedData(updatedData[0] || {});
  }

  return (
    <div className="App">
        <div className="App2">
        <input type="number" name="ID" placeholder="ID" onChange={setInput}></input>
          <input type="text" name="NAME" placeholder="Name" onChange={setInput}></input>
          <input type="text" name="Mobile_number" placeholder="mobile" onChange={setInput}></input>
          <input type="text" name="STATE" placeholder="State" onChange={setInput}></input>
          <br></br>
          <button onClick={getPerson}>get Person</button>
          <button onClick={createPerson}>Create Person</button>
          <button onClick={deletePerson}>Delete Person</button>
          <button onClick={updatePerson}>Update Person</button>
        </div>
    </div>
  );
}

export default Frontend;