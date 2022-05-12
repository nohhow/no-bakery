import React, { useState } from "react";
import KaKaoLogin from "react-kakao-login";

function KakaoLogin() {
  const [userData, setUserData] = useState({});
  const profileImg =  userData.profile_image;
  const nickname = userData.nickname;

  const onSuccess = (res) => {
    const data = res.profile.properties;
    console.log(data)
    setUserData(data);
  };

  return (
    <div>
      {profileImg ? (
        <div>
          <img className="w-100" src={profileImg} alt="profileImg" />
          <h3 className="mt-5"><strong>{nickname}</strong>님 반가워요~ 👋</h3>
          <br />
        </div>
      ) : (
        <KaKaoLogin
          token={process.env.REACT_APP_KAKAO_API}
          onSuccess={(result) => onSuccess(result)}
          onFail={console.error}
          onLogout={console.info}
          className="d-inline m-5"
          
        />
      )}
    </div>
  );
}

export default KakaoLogin;
