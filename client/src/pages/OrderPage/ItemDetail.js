import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/info/${itemId}`);
      console.log(request.data.db);
      setItem(request.data.db[0]);
    }
    fetchData();
  }, [itemId]);

  const handleClickQntBtn = (value) => {
    if (quantity + value <= 5 && quantity + value >= 1){
      setQuantity(quantity + value)
    }
  }

  const handleClickCart = () => {
    const userId = localStorage.getItem('id');
    
    if (!userId){
      alert('로그인 먼저 부탁드립니다.');
    }
    else{
      async function addToCart() {
        const respond = await axios.post(`/info/addtocart`, {data:{userid: userId, itemid:itemId, q:quantity}})
        console.log(respond);
      }

      addToCart()
    }
  }

  if (!item) return <div>...loading</div>;
  return (
    <main id="itemDetail_section">
      <h2>{item.category}</h2>
      <hr />

      <section className="top_view d-flex justify-content-between item-order-section">
        <article className="w-50 p-3 text-center">
          <img
            className="img-thumbnail img-thumb"
            src={item.img}
            alt="제품사진"
          />
        </article>
        <article className="w-50 p-4 d-flex flex-column justify-content-between">
          <div>
            <h1>{item.name}</h1>
            <p className="text-muted">
              <small>{item.sub}</small>
            </p>
            <p><span className="font-1 text-muted">개당 </span><span className="font-3">{item.price} </span><span className="font-2">❤️</span></p>
            <button type="button" className="qnt-btn btn-l" onClick={()=>{handleClickQntBtn(-1)}}>
              -
            </button>
            <input
              type="number"
              className="num-inp"
              readOnly="readonly"
              min="1"
              max="5"
              value={quantity}
            />
            <button type="button" className="qnt-btn btn-r" onClick={()=>{handleClickQntBtn(+1)}}>
              +
            </button>
            <span className="text-muted m-3"><small>최대 5개</small></span>
          </div>
          <Button className="mt-5" size="lg" variant="dark" onClick={() => handleClickCart()}>
            장바구니 담기
          </Button>
        </article>
      </section>
      <hr />

      <section></section>
    </main>
  );
}

export default ItemDetail;
