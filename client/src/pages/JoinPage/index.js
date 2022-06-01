import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function JoinPage() {
  const useLocationState = useLocation().state

  const kakaoId = useLocationState.id
  const name = useLocationState.name

  const [userName, setUserName] = useState(name)

  const handleInputChange = (e) => {
    setUserName(e.target.value)
  }

  return (
    <main id="join_section">
      <h2>👥 회원가입</h2>
      <hr />
      <div id="login_form_container" className="mx-auto text-center">
        <Form className="text-start">
          <Form.Group controlId="form-group-id">
            <Form.Label>회원번호</Form.Label>
            <Form.Control type="text" value={kakaoId} readOnly/>
            <Form.Label className="mt-3">이름</Form.Label>
            <Form.Control type="text" value={userName} onChange={(e)=>handleInputChange(e)}/>
            <Form.Label className="mt-3">약관 동의</Form.Label>
            <Form.Check label="동의함" id="checkbox-id" />
          </Form.Group>
          <Button variant="dark" className="mt-3" onClick={() => console.log("가입하기")}>
            가입하기
          </Button>
        </Form>
      </div>
    </main>
  );
}

export default JoinPage;
