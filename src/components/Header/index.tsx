import React, { useEffect, useRef, useState } from "react";
import img from "../../img/BOOKShop.png";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../Context";
import imgUser from "./img/user.webp";
const Header = () => {
  const [input, setInput] = useState(false);
  const { basket, setSearch, user, SignOut } = useProduct();
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setProfile(false); // Закрываем модальное окно, если клик был вне его
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handlePClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Предотвращаем всплытие события, чтобы модальное окно не закрывалось сразу же после открытия
    setProfile(false); // Закрываем модальное окно при клике на параграф
  };

  return (
    <header>
      <div className="container">
        <div className="header">
          <Link onClick={() => window.scroll(0, 0)} to="/">
            <img src={img} alt="" />
          </Link>
          <div className="text">
            <div className="blcok1">
              <Link to="search">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: input ? "" : "0px",
                    marginRight: input ? "" : "-25px",
                    paddingLeft: input ? "" : "0px",
                  }}
                  type="text"
                  placeholder="Search here"
                />
              </Link>
              <h2>
                <CiSearch
                  onClick={() => {
                    setInput(!input);
                  }}
                />
              </h2>
            </div>
            <Link onClick={() => window.scroll(0, 0)} to="/basket">
              <div className="blcok2">
                <div
                  style={{
                    display: basket.length === 0 ? "none" : "flex",
                  }}
                >
                  <p
                    style={{
                      fontSize: basket.length > 9 ? "" : "13px",
                    }}
                  >
                    {basket.length}
                  </p>
                </div>
                <h2>
                  <FaShoppingBasket />
                </h2>
                <h1>Корзина</h1>
              </div>
            </Link>
            {user ? (
              <div
                ref={modalRef}
                onClick={() => {
                  setProfile(true);
                }}
                style={{
                  background: user.photoURL
                    ? `url(${user.photoURL}) no-repeat center/cover`
                    : "green",
                }}
                className="user"
              >
                <h2
                  style={{
                    display: user.photoURL ? "none" : "block",
                  }}
                >
                  {user.email.toUpperCase()[0]}
                </h2>
                <div
                  style={{
                    transform: profile ? "scaleY(1)" : "scaleY(0)",
                  }}
                  className="modal"
                >
                  {user.email === "sultanmamytbekov98@gmail.com" ? (
                    <>
                      <p
                        onClick={(e) => {
                          handlePClick(e);
                          navigate("/admin");
                        }}
                      >
                        Admin
                      </p>
                      <p
                        onClick={(e) => {
                          handlePClick(e);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={(e) => {
                          handlePClick(e);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </p>
                    </>
                  )}
                  <p
                    onClick={(e) => {
                      handlePClick(e);
                      SignOut();
                    }}
                  >
                    Log out
                  </p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/signUp");
                }}
                style={{
                  background: `url(${imgUser}) no-repeat center/cover`,
                  cursor: "pointer",
                }}
                className="user"
              ></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
