import React, { useState } from "react";
import Beverages from "../../components/Beverages";
import Products from "../../components/Products";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";

function OrderPage() {
  const products = Products();
  const beverages = Beverages();

  const [nowTab, setNowTab] = useState("total");
  const handleTabClick = (event) => {
    setNowTab(event.id);
  };

  return (
    <div>
      <section id="order_section">
        <h2>📦 주문하기</h2>
        <hr />
        <Nav as="ul" variant="pills">
          <Nav.Item as="li">
            <Nav.Link id="total" className={nowTab==="total" ? "active" : ""} onClick={(e) => handleTabClick(e.target)}>
              전체
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link id="bread" className={nowTab==="bread" ? "active" : ""} onClick={(e) => handleTabClick(e.target)}>
              빵
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link id="dessert" className={nowTab==="dessert" ? "active" : ""} onClick={(e) => handleTabClick(e.target)}>
              디저트
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link id="beverage" className={nowTab==="beverage" ? "active" : ""} onClick={(e) => handleTabClick(e.target)}>
              음료
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <hr />
        <Container>
          <Row>
            {products.map((data, index) => {
              if (nowTab === "total") {
                return (
                  <Col sm={12} md={6} lg={4} key={index} className="py-3">
                    <Card>
                      <div className="card-img-container">
                        <Card.Img
                          variant="top"
                          src={data.img}
                          alt={data.name}
                        />
                      </div>
                      <Card.Body>{data.name}</Card.Body>
                    </Card>
                  </Col>
                );
              } else {
                if (nowTab === data.category) {
                  return (
                    <Col sm={12} md={6} lg={4} key={index} className="py-3">
                      <Card>
                        <div className="card-img-container">
                          <Card.Img
                            variant="top"
                            src={data.img}
                            alt={data.name}
                          />
                        </div>
                        <Card.Body>{data.name}</Card.Body>
                      </Card>
                    </Col>
                  );
                } else {
                  return "";
                }
              }
            })}
          </Row>
        </Container>
        <Container>
          <Row>
            {beverages.map((data, index) => {
              if (nowTab === "total") {
                return (
                  <Col sm={12} md={6} lg={4} key={index} className="py-3">
                    <Card>
                      <div className="card-img-container">
                        <Card.Img
                          variant="top"
                          src={data.img}
                          alt={data.name}
                        />
                      </div>
                      <Card.Body>{data.name}</Card.Body>
                    </Card>
                  </Col>
                );
              } else {
                if (nowTab === data.category) {
                  return (
                    <Col sm={12} md={6} lg={4} key={index} className="py-3">
                      <Card>
                        <div className="card-img-container">
                          <Card.Img
                            variant="top"
                            src={data.img}
                            alt={data.name}
                          />
                        </div>
                        <Card.Body>{data.name}</Card.Body>
                      </Card>
                    </Col>
                  );
                } else {
                  return "";
                }
              }
            })}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default OrderPage;
