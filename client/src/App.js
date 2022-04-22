import axios from "axios";
import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import InfoPage from "./pages/InfoPage";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";

function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => {
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
          <Route path="info" element={<InfoPage />}></Route>
          <Route path="order" element={<OrderPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
