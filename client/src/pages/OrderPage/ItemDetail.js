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
      const request = await axios.get(`/user_inform/${itemId}`);
      console.log(request);
      setItem(request.data);
    }
    fetchData();
  }, [itemId]);

  const handleClickQntBtn = (value) => {
    if (quantity + value <= 5 && quantity + value >= 1){
      setQuantity(quantity + value)
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
            <p><span className="font-3">1 </span><span className="font-2">❤️</span></p>
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
          </div>

          <Button className="mt-5" size="lg" variant="dark" onClick={() => console.log("Primary")}>
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
