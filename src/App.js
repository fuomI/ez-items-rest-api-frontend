// Import React and hooks: useState, useEffect
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // items hold all the items in JSON format
  // useEffect calls setItems
  const [items, setItems] = useState([])

  // Empty by default: When appropriate inputs' values are changed
  // setName, setPrice, setPicture are called
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [picture, setPicture] = useState('')

  // List of items updated each render
  useEffect(() => {

    const fetchItems = async () => {
      const result = await fetch('http://localhost:3001/api/getall')
      const jsonResult = await result.json()

      setItems(jsonResult)
    }

    fetchItems()
    console.log("hello")
  }, [])

  // Add new item
  const addItem = async () => {

    // newItem forms from input fields
    const newItem = {
      "name": name,
      "price": price,
      "picture": picture
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

  // Delete item using ID
  const deleteItem = async (id) =>   {

    // This time DELETE request
    const result = await fetch('http://localhost:3001/api/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resultInJson = await result.json()
    console.log(resultInJson)
  }

  return (
    <div >
      <h1>EzItems REST API</h1>
      <form onSubmit={addItem}>
        <h3>Add Item</h3>
        <div>
          <label>Item name</label>
          <input value={name} name="name" type="text" onChange={e => setName(e.target.value)}></input>
        </div>
        <div>
          <label>Price</label>
          <input value={price} name="price" type="text" onChange={e => setPrice(e.target.value)}></input>
        </div>
        <div>
          <label>Picture (URL)</label>
          <input value={picture} name="picture" type="text" onChange={e => setPicture(e.target.value)}></input>
        </div>
        <div>
          <input name="Add" type="submit" value="Add"></input>
        </div>
      </form>
      <div>
        <h2>Items</h2>
        {items.map(item =>
          <div key={item._id} id="itemsDiv">
            <img src={item.picture}></img>
            <h3>{item.name}</h3>
            <h3>{item.price} €</h3>
            <button onClick={e => deleteItem(item._id)} id="deleteBtn">Delete</button>
          </div>)}
      </div>
    </div>

  )
}

export default App;
