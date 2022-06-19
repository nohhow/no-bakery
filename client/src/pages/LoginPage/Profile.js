import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEamil, setUserEamil] = useState("");
  const [userHeart, setUserHeart] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [moreView, setMoreView] = useState(false);

  useEffect(() => {
    const getProfileInfo = async () => {
      const user_id = localStorage.getItem("id");
      const profileData = await axios.post("/info/user-profile", {
        data: { id: user_id },
      });

      const userData = await profileData.data.profile[0];
      setUserName(userData.nickname);
      setUserEamil(userData.email);
      setUserHeart(userData.heart);

      const getUserOrderData = async () => {
        const respond = await axios.post("/info/user-order-data", {
          data: { username: userData.nickname },
        });
        setUserOrder(respond.data.list);
      };
      getUserOrderData();

    };

    getProfileInfo();
  }, []);

  return (
    <main id="profile_section">
      <section className="text-center">
        <h2>{userName}님, 반가워요👋</h2>
        <h5>{userEamil}</h5>
        {/* <img
          className="w-50 rounded my-3"
          src={profileImage}
          alt="profileImg"
        ></img> */}
        <h5 className="my-5">
          현재 <strong>{userHeart}개</strong>의 ❤️를 보유하고 있어요!
        </h5>
        <Container>
          <Row>
            <Col className="border rounded shadow p-5 m-2">
              <h4>{userName}님의 취향</h4>
              <hr />
              {userOrder.length === 0 ? (
                <div>
                  <p>아직 주문 하신 적 없어요! 바로 주문하러 가실까요?</p>
                  <Link to="/order">
                    <Button variant="dark">주문하기</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <PieChart animate
                    data={[
                      { title: "One", value: 10, color: "#E38627"},
                      { title: "Two", value: 15, color: "#C13C37" },
                      { title: "Three", value: 20, color: "#6A2135" },
                    ]}
                  />
                </div>
              )}
            </Col>
            <Col className="border rounded shadow p-5 m-2">
              <h4>{userName}님의 주문현황</h4>
              <hr />
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>제품</th>
                    <th>수량</th>
                    <th>주문일시</th>
                    <th>주문상태</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrder.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={`${index > 2 && !moreView ? "d-none" : ""}`}
                      >
                        <td>
                          {data.itemList.split(",").map((data, index) => {
                            if (data !== "") {
                              return <p key={index}>{data}</p>;
                            } else {
                              return "";
                            }
                          })}
                        </td>
                        <td>
                          {data.quantityList.split(",").map((data, index) => {
                            if (data !== "") {
                              return <p key={index}>{data}</p>;
                            } else {
                              return "";
                            }
                          })}
                        </td>
                        <td>{data.orderdate}</td>
                        <td>{data.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {userOrder.length > 3 ? (
                <Button variant="dark" onClick={() => setMoreView(!moreView)}>
                  더보기
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default Profile;
