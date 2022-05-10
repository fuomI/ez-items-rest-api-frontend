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

  // Same thing but for searched items
  const [searched, setSearched] = useState('')

  // Popup state
  const [buttonPopup, setButtonPopup] = useState(false)

  // Get all items
  const fetchItems = async () => {
    const result = await fetch('http://localhost:3001/api/getall')
    const jsonResult = await result.json()

    setItems(jsonResult)
  }

  // Run when page loaded
  useEffect(() => {

    fetchItems()
    console.log("render")
  }, []) // Run when page loaded

  // Add new item
  const addItem = async () => {

    // newItem forms from input fields
    const newItem = {
      "name": name,
      "price": price,
      "picture": picture
    }

    // We use POST to add new item to database
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

    // This time DELETE request to delete from database
    const result = await fetch('http://localhost:3001/api/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resultInJson = await result.json()
    console.log(resultInJson)

    // Fetch items again when deleted
    fetchItems()
  }

  // Update item
  const updateItem = async (prevName, prevPrice, prevPicture, id) => {

    // newItem forms from input fields
    const updatedItem = {
      "name": name,
      "price": price,
      "picture": picture
    }

    // We use POST to add new item to database
    const result = await fetch('http://localhost:3001/api/update/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })

    const resultInJson = await result.json()
    console.log(resultInJson)

    // Fetch items again when updated
    fetchItems()
  }

  // Search item and focus it
  const searchHelp = async () => {

  }

  return (
    <div>
      <div>
        <h1>EzItems REST API</h1>
        <form onSubmit={addItem}>
          <h3>Add Item</h3>
          <label>Item name</label>
          <input value={name} type="text" onChange={e => setName(e.target.value)}></input>
          <label>Price</label>
          <input value={price} type="text" onChange={e => setPrice(e.target.value)}></input>
          <label>Picture (URL)</label>
          <input value={picture} type="text" onChange={e => setPicture(e.target.value)}></input>
          <input name="Add" type="submit" value="Add"></input>
        </form>
      </div>
      <div>
        <h2>Help</h2>
        <form onSubmit={searchHelp}>
          <input value={searched} name="searched" type="text" onChange={e => setSearched(e.target.value)}></input>
          <input id="searchBtn" name="Search" type="submit" value="Search"></input>
        </form>
      </div>
      <div>
        <h2>Items</h2>
        <form>
          <h3>Update Item</h3>
          <label>Item name</label>
          <input value={name} type="text" onChange={e => setName(e.target.value)}></input>
          <label>Price</label>
          <input value={price} type="text" onChange={e => setPrice(e.target.value)}></input>
          <label>Picture (URL)</label>
          <input value={picture} type="text" onChange={e => setPicture(e.target.value)}></input>
        </form>
        {items.map(item =>
          <div key={item._id} id="itemsDiv">
            <img src={item.picture}></img>
            <h3>{item.name}</h3>
            <h3>{item.price} €</h3>
            <button onClick={e => deleteItem(item._id)} id="deleteBtn">Delete</button>
            <button onClick={e => updateItem(item.name, item.price, item.picture, item._id)} id="updateBtn">Update</button>
          </div>)}
      </div>
      <div>
          <h2>Instructions</h2>
      </div>
    </div>
  )
}

export default App;
