import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import BookDetail from "../pages/BookDetail";
import Basket from "../pages/Basket";
import Psychology from "../pages/Psychology";
import Search from "../pages/Search";
import Admin from "../pages/Admin";
import Edit from "../pages/Edit";
import SignUp from "../pages/User/SginUp";
import SignIn from "../pages/User/SginIn";

const MainRoutes: React.FC = () => {
  let PUBLIC = [
    { path: "/", element: <Home />, id: 1 },
    { path: "/bookDetail/:Id", element: <BookDetail />, id: 2 },
    { path: "/basket", element: <Basket />, id: 3 },
    { path: "/psychology/:categories", element: <Psychology />, id: 4 },
    { path: "/psychology", element: <Psychology />, id: 5 },
    { path: "/search", element: <Search />, id: 6 },
    { path: "/admin", element: <Admin />, id: 7 },
    { path: "/edit/:edit", element: <Edit />, id: 8 },
    { path: "/signUp", element: <SignUp />, id: 9 },
    { path: "/signIn", element: <SignIn />, id: 10 },
  ];
  return (
    <div>
      <Routes>
        {PUBLIC.map((el, index) => (
          <Route key={index} path={el.path} element={el.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
