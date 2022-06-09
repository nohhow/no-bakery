import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, CloseButton } from "react-bootstrap";

function CartPage() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("id");

  const getData = async () => {
    const cartInfo = await axios.post(`/info/cart`, { data: { id: userId } });
    setCart(cartInfo.data.cartData); // 배열 형태로 저장
  };

  useEffect(() => {
    getData();
  }, []);

  let totalPrice = 0;
  for (let v in cart) {
    totalPrice += cart[v].quantity * cart[v].price;
  }

  const handleDelete = async (item) =>{
    await axios.post(`/info/delete-cart-item`, {data: { itemid : item, userid: userId}})
    getData();
  }


  const handleOrderClick = async () => {
    const userData = await axios.post(`/info/user-profile`, {data:{id:userId}})
    if (userData.status === 200){
      const userProfile = userData.data.profile[0]
      const requestResult = await axios.post(`/info/order`, {data:{userName: userProfile.nickname, email: userProfile.email, itemList: "1", quantityList: "1" , price: totalPrice}})
      console.log(requestResult)
    }else{
      alert("주문 실패. 다시 시도해주세요.");
    }
  }

  if (!cart) return <div>...loading</div>;
  return (
    <div>
      <main id="cart_section">
        <h2>🛒 장바구니</h2>
        <hr />
        {cart.length > 0 ? (
          <article>
            <Table striped borderless responsive className="text-center align-middle">
              <thead>
                <tr>
                  <th width="5%" scope="col"></th>
                  <th width="10%" scope="col">이미지</th>
                  <th width="15%" scope="col">제품명</th>
                  <th width="15%" scope="col">수량</th>
                  <th width="15%" scope="col">금액</th>
                  <th width="5%" scope="col"></th>
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
                      <td>{data.itemname}</td>
                      <td>{data.quantity}</td>
                      <td>{data.price * data.quantity} ❤️</td>
                      <td><CloseButton onClick={() => handleDelete(data.itemid)} /></td>
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
                onClick={() => handleOrderClick()}
              >
                주문하기
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
