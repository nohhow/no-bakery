import axios from "axios";
import React, { useEffect, useState } from "react";
import onlyAdmin from "../../images/onlyAdmin.jpeg";

function AdminPage() {
  const [userEmail, setUserEmail] = useState("");

  const getData = async () => {
    const userData = await axios.post("/info/check-admin", {
      data: { id: localStorage.getItem("id") },
    });
    setUserEmail(userData.data.userEmail[0].email);
  };

  useEffect(() => {
    getData();
  }, []);

  if (userEmail === "xksrma97@gmail.com") {
    return (
      <main id="admin_section">
        <h1>주인장 납셔</h1>
      </main>
    );
  } else if (userEmail === "") {
    return (
      <main id="admin_section">
      </main>
    );
  } else {
    return (
      <main id="admin_section">
        <img src={onlyAdmin} alt="only admin" />
      </main>
    );
  }
}

export default AdminPage;
