import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Table } from "react-bootstrap";
import onlyAdmin from "../../images/onlyAdmin.jpeg";

function AdminPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [nowTab, setNowTab] = useState("order");

  const getCheckAdmin = async () => {
    const userData = await axios.post("/info/check-admin", {
      data: { id: localStorage.getItem("id") },
    });
    setUserEmail(userData.data.userEmail[0].email);
  };

  const getUserData = async () => {
    const allUserData = await axios.get(`info/all-user-data`);
    setUserList(allUserData.data.list);
  };

  const getOrderData = async () => {
    const allOrderData = await axios.get(`info/all-order-data`);
    setOrderList(allOrderData.data.list);
  };

  useEffect(() => {
    getCheckAdmin();
    getUserData();
    getOrderData();
  }, []);

  const handleTabClick = (event) => {
    setNowTab(event.id);
  };

  if (userEmail === "xksrma97@gmail.com") {
    return (
      <main id="admin_section">
        <h2>🥸 ADMIN</h2>
        <hr />
        <Nav as="ul" variant="pills">
          <Nav.Item as="li">
            <Nav.Link
              id="order"
              className={nowTab === "order" ? "active" : ""}
              onClick={(e) => handleTabClick(e.target)}
            >
              주문 관리
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link
              id="user"
              className={nowTab === "user" ? "active" : ""}
              onClick={(e) => handleTabClick(e.target)}
            >
              회원 관리
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <hr />

        {nowTab === "order" ? (
          <section>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>주문일시</th>
                  <th>주문자명</th>
                  <th>이메일</th>
                  <th>제품</th>
                  <th>수량</th>
                  <th>지불금액</th>
                  <th>주문상태</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((data, index) => {
                  return (
                    <tr key={index} onClick={() => alert(`안뇽하모니카${index}`)}>
                      <td>{data.orderdate}</td>
                      <td>{data.username}</td>
                      <td>{data.userEmail}</td>
                      <td>
                        {data.itemList.split(",").map((data) => {
                          if (data !== "") {
                            return <p>{data}</p>;
                          } else {
                            return "";
                          }
                        })}
                      </td>
                      <td>
                        {data.quantityList.split(",").map((data) => {
                          if (data !== "") {
                            return <p>{data}</p>;
                          } else {
                            return "";
                          }
                        })}
                      </td>
                      <td>{data.price} ❤️</td>
                      <td>
                        {data.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        ) : nowTab === "user" ? (
          <section>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>하트 수</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.nickname}</td>
                      <td>{data.email}</td>
                      <td>{data.heart}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        ) : (
          ""
        )}
      </main>
    );
  } else if (userEmail === "") {
    return <main id="admin_section"></main>;
  } else {
    return (
      <main id="admin_section">
        <img src={onlyAdmin} alt="only admin" />
      </main>
    );
  }
}

export default AdminPage;
