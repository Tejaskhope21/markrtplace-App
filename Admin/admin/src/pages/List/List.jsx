import React from 'react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function List() {
  const url = "http://localhost:5000";
  const [items, setItems] = useState([]);

   const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/items/item`);
      if (response.data.success && Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          toast.info("No food items found.");
        }
        setItems(response.data.data);
      } else {
        toast.error("Invalid data format received from the server");
      }
    } catch (error) {
      
    }
   }
  return (
 <div></div>
  )
}

export default List
