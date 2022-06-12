// Import React and hooks: useState, useEffect
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // items hold all the items in JSON format
  // useEffect calls setItems
  const [items, setItems] = useState([])

  // Empty by default: When appropriate inputs' values are changed
  // setName, setPrice, setPicture are called when adding item
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [picture, setPicture] = useState('')

  // setUpdatedName, setUpdatedPrice, setUpdatedPicture are called when updating item
  const [updatedName, setUpdatedName] = useState('')
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [updatedPicture, setUpdatedPicture] = useState('')

  // Get all items
  const fetchItems = async () => {
    const result = await fetch('http://localhost:3001/api/getall')
    const jsonResult = await result.json()

    // Change the useState of items
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
  const updateItem = async (id) => {

    // newItem forms from input fields
    const updatedItem = {
      "name": updatedName,
      "price": updatedPrice,
      "picture": updatedPicture
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
        <h2>Items</h2>
        <form>
          <h3>Update Item</h3>
          <label>Item name</label>
          <input value={updatedName} type="text" onChange={e => setUpdatedName(e.target.value)}></input>
          <label>Price</label>
          <input value={updatedPrice} type="text" onChange={e => setUpdatedPrice(e.target.value)}></input>
          <label>Picture (URL)</label>
          <input value={updatedPicture} type="text" onChange={e => setUpdatedPicture(e.target.value)}></input>
        </form>
        {items.map(item =>
          <div key={item._id} id="itemsDiv">
            <img src={item.picture}></img>
            <h3>{item.name}</h3>
            <h3>{item.price} €</h3>
            <button onClick={e => deleteItem(item._id)} id="deleteBtn">Delete</button>
            <button onClick={e => updateItem(item._id)} id="updateBtn">Update</button>
          </div>)}
      </div>
      <div>
          <h2>Instructions</h2>
          <h3>Adding item:</h3>
          <p>The user can add item using the add item form at the top of the page.</p>
          <h3>Deleting item:</h3>
          <p>The user can delete an item simply by clicking the red "Delete" -button attached to a item.</p>
          <h3>Updating item:</h3>
          <p>The user can update item by filling out "Update item" -form and then clicking "Update" -button attached to the item.</p>
          <p>All fields must be updated to avoid empty fields. Previous data gets over written.</p>
          <h3>! WARNING !</h3>
          <p>All the changes are permanent and affect the database.</p>
      </div>
    </div>
  )
}

export default App;
