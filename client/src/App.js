import axios from "axios";
import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import CartPage from "./pages/CartPage";
import InfoPage from "./pages/InfoPage";
import ItemDetail from "./pages/OrderPage/ItemDetail";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import Auth from "./components/Auth";
import Profile from "./pages/LoginPage/Profile";

function App() {
  const callApi = async () => {
    axios.get("/info").then((res) => {
      console.log(res.data.test);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  const Layout = () => {
    return (
      <div>
        <HeaderNav />
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="about" element={<InfoPage />}></Route>
          <Route path=":itemId" element={<ItemDetail/>}></Route>
          <Route path="order" element={<OrderPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="join" element={<JoinPage />}></Route>
          <Route path="cart" element={<CartPage/>}></Route>
          <Route path="/oauth/kakao/callback" element={<Auth />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
