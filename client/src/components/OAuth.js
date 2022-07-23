const CLIENT_ID = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "https://resplendent-peony-82a1f7.netlify.app/oauth/kakao/callback";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;