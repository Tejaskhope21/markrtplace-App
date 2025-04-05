import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function List() {
  const url = "http://localhost:5000";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
      
    }finally {
      setLoading(false);
    }
   }
   const removeitem=async(item)=>{
    const response=await axios.post(`${url}/api/foitems/remove`,{id:items._id});
    await fetchItems();
    if(response.data.success){
      toast.success(response.data.massage)
    }else{
      toast.error("error")
    }
    }
  
    useEffect(() => {
      fetchItems();
    }, []);
  return (
 <div>
  {items.map((item, index) => (
  <div key={index} className="list-table-row">
    <div className="list-table-column">
      <img src={`${url}/uploads/${item.images?.[0]}`} alt={item.name} className="item-image" />
    </div>

    <div className="list-table-column">{item.name}</div>
    <div className="list-table-column">{item.category}</div>
    <div className="list-table-column">
      <div>MOQ: {item.MOQ}</div>
      <div>B2B Menu: {item.b2b_menu}</div>
    </div>

    <div className="list-table-column">
      <div>20-199: ${item.price_per_piece?.["20-199"]}</div>
      <div>200-999: ${item.price_per_piece?.["200-999"]}</div>
      <div>1000+: ${item.price_per_piece?.["1000+"]}</div>
    </div>

    <div className="list-table-column">
      <div>Color: {item.specifications?.color}</div>
      <div>Weight: {item.specifications?.weight}</div>
      <div>Battery: {item.specifications?.battery}</div>
    </div>

    <div className="list-table-column">
      <div>Supplier: {item.supplier?.name}</div>
      <div>Location: {item.supplier?.location}</div>
    </div>

    <div className="list-table-column">
      <div>Free Shipping Above: ${item.shipping?.free_shipping_above}</div>
      <div>Shipping Cost: ${item.shipping?.cost}</div>
    </div>

    <div className="list-table-column">
      <button onClick={() => removeitem(item._id)} className="remove-button">X</button>
    </div>
  </div>
))}

 </div>
  )
}

export default List
