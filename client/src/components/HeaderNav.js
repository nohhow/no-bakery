import React, { useRef, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderNav() {
  const [currentTabId, setCurrentTabId] = useState("");
  const aboutTab = useRef();
  const orderTab = useRef();

  return (
    <div>
      <header>
        <nav>
          <Navbar
            className="navbar px-4 fixed-top"
            expand="lg"
            bg="light"
            variant="light"
          >
            <Navbar.Brand color="dark">
              <Link className="navbar-light navbar-nav nav-brand" to="/">
                <strong>NO BAKERY</strong>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-collapse-id" />
            <Navbar.Collapse id="navbar-collapse-id">
              <Nav as="ul">
                <Nav.Item as="li">
                  <Link
                    className="navbar-light navbar-nav nav-link"
                    ref={aboutTab}
                    to="/info"
                  >
                    🍞 노 베이커리에 대해서
                  </Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link
                    className="navbar-light navbar-nav nav-link"
                    ref={orderTab}
                    to="/order"
                  >
                    📦 주문하기
                  </Link>
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
    </div>
  );
}

export default HeaderNav;
