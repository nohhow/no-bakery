import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            <Col className="border p-5 mx-1">
              <p>바로 주문하러 가실래요?</p>
              <Link to="/order">
                <Button variant="dark">주문하기</Button>
              </Link>
            </Col>
            <Col className="border p-5 mx-1">
              <p>주문 현황</p>
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
                        <td>
                          {data.status}
                        </td>
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
