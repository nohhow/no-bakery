import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState({})
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/user_inform/${itemId}`);
      console.log(request)
      setItem(request.data);
    }
    fetchData();
  }, [itemId]);

  console.log(item)
  
  if (!item)  return <div>...loading</div>;
  return (
      <section id="itemDetail_section">
        <h1>제품 : {item.id}</h1>
        <img className="w-25" src={item.img} alt="제품사진"/>
        <p>{item.name}</p>
        
      </section>
  )
}

export default ItemDetail