import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
      
      return {id : data.id, name : data.properties.nickname}
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCheckDuplicate();
  }, []);

  const getCheckDuplicate = async () => {
    let profileData = await getProfile();
    const kakaoId = profileData.id
    const kakaoName = profileData.name
    // 회원 정보로 다음 동작 지정
    axios.get(`/info/check_user/${kakaoId}`).then(function (res) {
      const code = res.data.code[0].count;
      console.log(code);
      if (code === 0) {
        console.log("회원가입으로 이동합니다!!");
        navigate('/join', {state : {id : kakaoId, name: kakaoName}})
      } else {
        console.log("로그인이 성공! 환영 페이지로 이동합니다!");
      }
    });
  };

  return (
    <main id="profile_section">
      <section className="text-center">
        <h2>{nickName}님, 반가워요👋</h2>
        <img
          className="w-50 rounded my-3"
          src={profileImage}
          alt="profileImg"
        ></img>
        <p>바로 주문하러 가실래요?</p>
        <Link to="/order">
          <Button variant="dark" onClick={() => console.log("Dark")}>
            주문하기
          </Button>
        </Link>
      </section>
    </main>
  );
};
export default Profile;
