import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
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
