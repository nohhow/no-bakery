import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function LoginPage() {
  return (
    <div>
      <section id="login_section">
        <h2>👤 로그인</h2>
        <hr />
        <div>
          <div className="w-50 mx-auto">
            <Form.Group controlId="form-group-id" className="d-flex mb-3">
              <Form.Label className="w-25 my-auto">아이디</Form.Label>
              <Form.Control type="text" placeholder="id" />
            </Form.Group>
            <Form.Group controlId="form-group-id" className="d-flex mb-3">
              <Form.Label className="w-25 my-auto">비밀번호</Form.Label>
              <Form.Control type="text" placeholder="password" />
            </Form.Group>
            <Button variant="dark" className="w-100 mb-3" type="submit">
              로그인
            </Button>
            <Link to="/join" className="text-decoration-none text-dark">
              <Button variant="light" className="w-100 border">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
