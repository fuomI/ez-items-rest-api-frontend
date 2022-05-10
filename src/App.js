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

  const addItem = async () => {

    const newItem = {
      "name": "Jauheliha 400g",
      "price": 2.20,
      "picture": "https://cdn.s-cloud.fi/v1/h480w320/product/ean/6414893500044_kuva1.jpg"
    }

    const result = await fetch('http://localhost:3001/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })

    const resultInJson = await result.json()
    console.log(resultInJson)
  }

  return (
    <div>
      <h1>EzItems REST API</h1>
      <form onSubmit={addItem}>
        <h3>Add Item</h3>
        <div>
          <label>Item name</label>
          <input name="name" type="text"></input>
        </div>
        <div>
          <label>Price</label>
          <input name="price" type="text"></input>
        </div>
        <div>
          <label>Picture</label>
          <input name="picture" type="text"></input>
        </div>
        <div>
          <input name="Add" type="submit" value="Add"></input>
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
