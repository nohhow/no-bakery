import React from "react";
import { Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTodayPick } from "../../hooks/useTodayPick";
import banner1 from "../../images/banner/banner1.png";
import banner2 from "../../images/banner/banner2.png";

const MainPage = () => {
  const picks = useTodayPick();

  return (
    <div>
      <section>
        <Carousel pause="false" interval="3000" controls="" fade="true">
          <Carousel.Item>
            <img
              className=" d-block banner-img mx-auto"
              src={banner1}
              alt="First slide"
            />
            <Carousel.Caption className="bg-dark-75">
              <h3>레몬 마들렌</h3>
              <p>노진현이 자랑하는 시그니처 마들렌</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block banner-img mx-auto"
              src={banner2}
              alt="Second slide"
            />
            <Carousel.Caption className="bg-dark-75">
              <h3>초코 머핀</h3>
              <p>초코렛이 아낌없이 들어가 달콤함이 오래가는 머핀</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section id="main_section" className="text-center">
        <div className="box text-start">
          <h5>NOTICE</h5>
          <ul>
            <li>노 베이커리의 모든 제품은 수익을 위한 판매용이 아닙니다.</li>
            <li><Link to="order"><strong>📦 주문하기</strong></Link> 를 통해서 주문하면 이메일로 수령 날짜를 보내드립니다.</li>
          </ul>
        </div>
        <h1>이거 어때요?</h1>
        <div className="todayPick m-3">
          <Card className="w-25 d-inline-block">
            <Card.Img variant="top" src={picks[0].img} />
            <Card.Title>{picks[0].name}</Card.Title>
          </Card>
          <Card className="w-25 d-inline-block">
            <Card.Img variant="top" src={picks[1].img} />
            <Card.Title>{picks[1].name}</Card.Title>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
