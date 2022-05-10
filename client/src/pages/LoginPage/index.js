import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

function LoginPage() {
  const [inputId, setinputId] = useState("");
  const [inputPw, setinputPw] = useState("");

  const handleInputId = (e) => {
    setinputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setinputPw(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
  };

  const getLoginInfo = async () => {
    axios.get("/user_inform/login").then((res) => {
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getLoginInfo();
  }, []);

  return (
    <main id="login_section">
      <h2>👤 로그인</h2>
      <hr />
      <div>
        <div id="login_form_container" className="mx-auto">
          <div className="p-2">
            <label htmlFor="input_id" className="text-start w-25">
              아이디
            </label>
            <input
              className="w-75"
              type="text"
              name="input_id"
              value={inputId}
              onChange={handleInputId}
            />
          </div>
          <div className="p-2 mb-4">
            <label htmlFor="input_pw" className="text-start w-25">
              비밀번호
            </label>
            <input
              className="w-75"
              type="password"
              name="input_pw"
              value={inputPw}
              onChange={handleInputPw}
            />
          </div>
          <Button variant="dark" className="w-100 mb-3" onClick={onClickLogin}>
            로그인
          </Button>
          <Link to="/join" className="text-decoration-none text-dark">
            <Button variant="light" className="w-100 border">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
