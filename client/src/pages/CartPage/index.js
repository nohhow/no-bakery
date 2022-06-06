import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");

    const getData = async () => {
      const cartInfo = await axios.post(`/info/cart`, { data: { id: userId } });
      setCart(cartInfo.data.cartData); // 배열 형태로 저장
      console.log(cartInfo.data.cartData);
    };
    getData();
  }, []);

  let totalPrice = 0;
  for (let v in cart) {
    totalPrice += cart[v].quantity * cart[v].price;
  }

  if (!cart) return <div>...loading</div>;
  return (
    <div>
      <main id="cart_section">
        <h2>🛒 장바구니</h2>
        <hr />
        {cart.length > 0 ? (
          <article>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">이미지</th>
                  <th scope="col">제품명</th>
                  <th scope="col">갯수</th>
                  <th scope="col">금액</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          width="auto"
                          height="70px"
                          src={data.image}
                          alt="제품이미지"
                        />
                      </td>
                      <td>{data.itemid}</td>
                      <td>{data.quantity}</td>
                      <td>{data.price * data.quantity} ❤️</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h3 className="text-end">총 비용 : {totalPrice} ❤️</h3>
            <div className="text-end">
              <Button
                className="btn-lg mt-3 "
                variant="dark"
                onClick={() => console.log("결제하기")}
              >
                결제하기
              </Button>
            </div>
          </article>
        ) : (
          <h1 className="text-center mt-5">텅~</h1>
        )}
      </main>
    </div>
  );
}

export default CartPage;
