import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Table } from "react-bootstrap";
import onlyAdmin from "../../images/onlyAdmin.jpeg";

function AdminPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userList, setUserList] = useState("");
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

  useEffect(() => {
    getCheckAdmin();
    getUserData();
  }, []);

  const handleTabClick = (event) => {
    setNowTab(event.id);
  };

  if (userEmail === "xksrma97@gmail.com") {
    return (
      <main id="admin_section">
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
            <ul>
              <li>주문1</li>
              <li>주문2</li>
            </ul>
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
