import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderNav({ isLogin, setLogin }) {
  const handleLogOut = () => {
    localStorage.clear()
    setLogin(false)
  }
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
                    to="/about"
                  >
                    🍞 노 베이커리에 대해서
                  </Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link
                    className="navbar-light navbar-nav nav-link"
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
                  {isLogin ? (
                    <Link
                      className="navbar-light navbar-nav nav-link"
                      onClick={() => handleLogOut()}
                      to="/"
                    >
                      😭 로그아웃
                    </Link>
                  ) : (
                    <Link
                      className="navbar-light navbar-nav nav-link"
                      to="/login"
                    >
                      👤 로그인
                    </Link>
                  )}
                </Nav.Item>
                <Nav.Item as="li">
                  <Link className="navbar-light navbar-nav nav-link" to="/cart">
                    🛒 장바구니<span className="badge bg-dark mx-1">0</span>
                  </Link>
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
