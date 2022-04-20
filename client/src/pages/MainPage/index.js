import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../../images/banner/banner1.png";
import banner2 from "../../images/banner/banner2.png";

const MainPage = () => {
  return (
    <div>
      <section>
        <Carousel pause="false" interval="3000" controls="false">
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

      <section className="p-5">
        <div>안녕하세요</div>
        <div>여기는 상품진열대입니당.</div>
      </section>
    </div>
  );
};

export default MainPage;
