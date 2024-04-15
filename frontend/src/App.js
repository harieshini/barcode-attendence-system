import React, { useState } from "react";
import StudentDetails from "./StudentDetails";
import Login from "./Login";
import Report from "./Report";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // For simplicity, assume the login is successful for any username and password
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login></Login>}></Route> */}
          {/* <Route path="/" element={<Login></Login>}></Route> */}
          <Route path="/" element={<StudentDetails />} />

          {/* <Route
            path="/"
            element={
              <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
            }
          /> */}

          <Route path="/report" element={<Report></Report>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
