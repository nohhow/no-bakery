import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState({})
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/user_inform/${itemId}`);
      setItem(request.data);
    }
    fetchData();
  }, [itemId]);

  if (!item)  return <div>...loading</div>;
  return (
      <section id="itemDetail_section">
        <h1>제품 : {item.data}</h1>
        {/* <img src={item.img} alt="제품사진"/> */}
      </section>
  )
}

export default ItemDetail