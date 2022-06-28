import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import onlyAdmin from "../../images/onlyAdmin.jpeg";
import ManageOrder from "./ManageOrder";
import ManageUser from "./ManageUser";

function AdminPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  // tab bar
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

  // Modal이 close될 때 변경된 정보가 반영될 수 있도록 함
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
          <ManageOrder orderList={orderList} setOrderList={setOrderList}/>
        ) : nowTab === "user" ? ( // 회원 관리 탭
          <ManageUser userList={userList} setUserList={setUserList}/>
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
