import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function JoinPage() {
  const useLocationState = useLocation().state;
  const navigate = useNavigate();
  const kakaoId = useLocationState.id;
  const name = useLocationState.name;

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handleCheckBox = () => {
    if (!agree) {
      setAgree(true);
    } else {
      setAgree(false);
    }
  };

  const handleSubmit = async () => {
    navigate('/')

    let res = await axios.post('/info/register', {data: {name: userName, id : kakaoId, email: userEmail}})
    console.log("등록 메시지", res)
  };

  return (
    <main id="join_section">
      <h2>👥 회원가입</h2>
      <hr />
      <div id="login_form_container" className="mx-auto text-center">
        <Form className="text-start" onSubmit={() => handleSubmit()}>
          <Form.Group controlId="form-group-id">
            <Form.Label>회원번호</Form.Label>
            <Form.Control type="text" value={kakaoId} readOnly />
            <Form.Label className="mt-3">이메일</Form.Label>
            <Form.Control
              type="email"
              value={userEmail}
              onChange={(e) => handleEmailChange(e)}
            />
            <Form.Label className="mt-3">이름</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => handleNameChange(e)}
            />
            <Form.Label className="mt-3">약관 동의</Form.Label>
            <Form.Check
              label="동의함"
              id="checkbox-id"
              onChange={() => handleCheckBox()}
              checked={agree}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            disabled={!agree}
            className="mt-3"
          >
            가입하기
          </Button>
        </Form>
      </div>
    </main>
  );
}

export default JoinPage;
