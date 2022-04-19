import axios from "axios";
import { useEffect } from "react";
import { Navbar, Nav, Carousel } from "react-bootstrap";
import "./App.css";

import banner1 from "./images/banner/banner1.png"
import banner2 from "./images/banner/banner2.png"


function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data.test);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header>
        <nav>
          <Navbar
            className="navbar px-4 fixed-top"
            expand="lg"
            bg="light"
            variant="light"
          >
            <Navbar.Brand color="dark">
              <strong>NO BAKERY</strong>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-collapse-id" />
            <Navbar.Collapse id="navbar-collapse-id">
              <Nav as="ul">
                <Nav.Item as="li">
                  <Nav.Link href="#">🍞 제품안내</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="#">📦 주문하기</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse
              id="navbar-collapse-id"
              className="justify-content-end"
            >
              <Nav as="ul">
                <Nav.Item as="li">
                  <Nav.Link href="#">👤 로그인</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="#">
                    🛒 장바구니 <span className="badge bg-dark">4</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </nav>
      </header>

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
              <p>노진현이 가장 자신있어하는 시그니처 마들렌</p>
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
      <footer className="p-4">
        <h5>NO BAKERY</h5>
        <p>노 베이커리는 특별한 사람들을 위한 온라인 주문 서비스 입니다.</p>
      </footer>
    </div>
  );
}

export default App;
