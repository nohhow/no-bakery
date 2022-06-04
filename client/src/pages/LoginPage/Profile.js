import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEamil, setUserEamil] = useState("");
  const [userHeart, setUserHeart] = useState(0);

  useEffect(() => {
    const getProfileInfo = async () => {
      const user_id = localStorage.getItem('id');
      const profileData = await axios.post('/info/user-profile', {data : {id : user_id}});
  
      const userData = await profileData.data.profile[0];
      setUserName(userData.nickname);
      setUserEamil(userData.email);
      setUserHeart(userData.heart);    
    }

    getProfileInfo();
  }, [])
  

  return (
    <main id="profile_section">
      <section className="text-center">
        <h2>{userName}님, 반가워요👋</h2>
        <h5>{userEamil}</h5>
        {/* <img
          className="w-50 rounded my-3"
          src={profileImage}
          alt="profileImg"
        ></img> */}
        <h5 className="my-5">현재 {userHeart}개의 ❤️를 보유하고 있어요!</h5>
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
