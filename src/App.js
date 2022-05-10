// Import React and hooks: useState, useEffect
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [items, setItems] = useState([])

  useEffect(() => {

    // Default state of items
    const fetchItems = async () => {
      const result = await fetch('http://localhost:3001/api/getall')
      const jsonResult = await result.json()

      setItems(jsonResult)
    }

    fetchItems()
    console.log("hello")
  }, [])


  return (
    <div>
      <h1>EzItems REST API</h1>
      <form>
        <div>
          <label>Item name</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Price</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Picture</label>
          <input type="text"></input>
        </div>
        <div>
          <input name="Find" type="submit" value="Find"></input>
          <input name="Add" type="submit" value="Add"></input>
          <input name="Update" type="submit" value="Update"></input>
          <input name="Delete" type="submit" value="Delete"></input>
        </div>
      </form>
      <div>
        <h2>Items:</h2>
        {items.map(item =>
          <div key={item._id}>
            <img src={item.picture}></img>
            <h3>{item.name}</h3>
            <h3>{item.price} €</h3>
          </div>)}
      </div>
    </div>

  )
}

export default App;
