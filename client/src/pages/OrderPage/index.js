import React from "react";
import Beverages from "../../components/Beverages";
import Products from "../../components/Products";
import { Container, Row, Col, Card } from "react-bootstrap";

function OrderPage() {
  const products = Products();
  const beverages = Beverages();

  return (
    <div>
      <section id="order_section">
          <h1>📦 주문하기</h1>
        <Container>
          <Row>
            {products.map((data, index) => {
              return (
                <Col sm={12} md={6} lg={4} key={index} className="py-3">
                  <Card>
                    <div className="card-img-container">
                      <Card.Img variant="top" src={data.img} alt={data.name} />
                    </div>
                    <Card.Body>{data.name}</Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <Container>
          <Row>
            {beverages.map((data, index) => {
              return (
                <Col sm={12} md={6} lg={4} key={index} className="py-3">
                  <Card>
                    <div className="card-img-container">
                      <Card.Img variant="top" src={data.img} alt={data.name} />
                    </div>
                    <Card.Body>{data.name}</Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default OrderPage;
