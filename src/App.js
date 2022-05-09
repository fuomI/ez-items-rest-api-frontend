// Import React and hooks: useState,
import React, { useState } from 'react';

function App() {

  // By default shows all items from API
  const [operation, setOperation] = useState(


  )

  return (
    // API Requests
    <>
      <button>Show Items</button>
      <button>Add Item</button>
      <button>Delete Item</button>
      <button>Update Item</button>
      <button>Find Item</button>
      <br></br>
      <table></table>
    </>
  )
}

export default App;
