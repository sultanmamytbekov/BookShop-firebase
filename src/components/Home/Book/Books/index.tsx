import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../img/Vector.svg";
import img1 from "../img/Group 1129.svg";
import { useProduct } from "../../../../Context";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
const Books = ({ el }: any) => {
  const { Basket, RemoveProduct, user } = useProduct();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hover, setHover] = useState(false);
  const [remove, setRemove] = useState(false);
  return (
    <div className="block" style={{ position: "relative" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="url"
      > 
        {user ? (
          <>
            {user.email === "sultanmamytbekov98@gmail.com" ? (
              <>
                <h1
                  style={{
                    display: hover ? "flex" : "none",
                  }}
                  className="h1"
                  onClick={() => {
                    setRemove(true);
                  }}
                >
                  <MdDelete />
                </h1>
                <h2
                  onClick={() => navigate(`/edit/${el.id}`)}
                  style={{
                    display: hover ? "flex" : "none",
                  }}
                >
                  <FaPenToSquare />
                </h2>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        <Link to={`/bookDetail/${el.id}`}>
          <img className="img" src={el.img} alt="" />
        </Link>
      </div>
      <div
        style={{
          display: remove ? "flex" : "none",
        }}
        className="modalB"
      ></div>
      <div
        style={{
          display: remove ? "flex" : "none",
        }}
        className="blocks"
      >
        <h1>Вы диствительно хотите удалить книгу?</h1>
        <div>
          <button
            onClick={() => {
              setRemove(false);
            }}
            className="bodalBtn1"
          >
            Нет
          </button>
          <button
            onClick={() => {
              RemoveProduct(el.id);
              setRemove(false);
            }}
            className="bodalBtn2"
          >
            Да
          </button>
        </div>
      </div>
      <div className="blockHome">
        <h2>{el.price} сом</h2>
        {el.basket ? (
          <img
            onClick={() => {
              navigate("/basket");
              window.scroll(0, 0);
            }}
            src={img1}
            alt=""
            style={{ position: "relative" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : (
          <img
            src={img}
            alt=""
            onClick={() => Basket(el)}
            style={{ position: "relative" }}
          />
        )}
        {isHovered && (
          <p
            style={{
              position: "absolute",
              bottom: "-25px",
              left: "120%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "5px 15px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: "1",
            }}
          >
            Перейти в баскет
          </p>
        )}
      </div>
      <p>{el.genres}</p>
    </div>
  );
};

export default Books;
