import React, { useEffect, useState } from "react";
import { useProduct } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import Recom from "./Recom";
import Comment from "./Comment";

interface IProduct {
  id: number;
  name: string;
  by: string;
  descr: string;
  img: string;
  price: number;
  genres: string;
  count: number;
  basket: boolean;
}

const BookDetail = () => {
  const [mouse, setMouse] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const [extra, setExtra] = useState<boolean>(false);
  const navigate = useNavigate();
  const { product, IF, setBasket, setProduct, user } = useProduct();
  const { Id } = useParams();
  const [remove, setRemove] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  
  const newProduct: IProduct = [...product].filter((el) => el.id == Id)[0];
  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("basket") as string) || [];
    setExtra(basket.some((el: IProduct) => el.id === newProduct.id));
    window.scroll(0, 0);
  }, []);
  console.log(position);

  function AddToBasket(arr: IProduct) {
    const basket = JSON.parse(localStorage.getItem("basket") as string) || [];
    if (basket.some((el: IProduct) => el.id === arr.id)) {
      navigate("/basket");
      return;
    }
    basket.push(arr);
    localStorage.setItem("basket", JSON.stringify(basket));
    setExtra(true);
    setBasket(basket);
    const data = JSON.parse(localStorage.getItem("data") as string) || [];
    data.forEach((el: IProduct) => {
      let foundEl = basket.find((item: IProduct) => item.id === el.id);
      if (foundEl) {
        return (el.basket = true);
      }
    });
    localStorage.setItem("data", JSON.stringify(data));
    setProduct(data);
  }

  const countPlus = () => {
    newProduct.count += 1;
    setNum(num + 1);
  };

  const countMinys = () => {
    newProduct.count -= newProduct.count === 1 ? 0 : 1;
    setNum(num + 1);
  };

  return (
    <>
      <div id="bookDetail">
        <div className="container">
          <div className="bookDetail">
            <h1>
              <span
                onClick={() => navigate("/")}
                onMouseLeave={() => setMouse(0)}
                onMouseOver={() => setMouse(1)}
                className="span"
              >
                Главная /
              </span>{" "}
              <span
                onClick={() => navigate("/psychology")}
                onMouseLeave={() => setMouse(0)}
                onMouseOver={() => setMouse(1)}
                className="span1"
              >
                Психология /
              </span>{" "}
              <span
                onMouseLeave={() => setMouse(0)}
                onMouseOver={() => setMouse(2)}
                style={{ color: IF(mouse) }}
              >
                {newProduct.name}
              </span>{" "}
            </h1>
            <div className="text">
              <img src={newProduct.img} alt="" />
              <div className="block">
                <h1>{newProduct.name}</h1>
                <h1 className="price">
                  {+String(newProduct.price / 89).slice(0, 3)} $
                </h1>
                <h2>Жанр: {newProduct.genres} </h2>
                <div className="count">
                  <button
                    style={{
                      color: newProduct.count === 1 ? "#010049" : "",
                    }}
                    onClick={countMinys}
                  >
                    -
                  </button>
                  <h3>{newProduct.count}</h3>
                  <button onClick={countPlus}>+</button>
                </div>
                <h2>Описание</h2>
                <p>{newProduct.descr.slice(0, 200)}</p>
                <button
                  onClick={() => {
                    AddToBasket(newProduct);
                  }}
                  style={{
                    backgroundColor: extra ? "#010049" : "",
                    color: extra ? "#fff" : "",
                  }}
                >
                  {extra ? "Добавлено в корзину" : "Добавить в корзину"}
                </button>
                <br />
                <button
                  onClick={() => {
                    setRemove(true);
                  }}
                >
                  Купить сейчас
                </button>
              </div>
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
                  style={{
                    marginLeft: "-130px",
                  }}
                  onClick={() => {
                    setRemove(false);
                  }}
                  className="bodalBtn1"
                >
                  Нет
                </button>
                <button
                onMouseOver={() => {
                  setPosition({
                    ...position, top:Math.floor(Math.random() * 500) , left: Math.floor(Math.random() * 500)
                  })
                }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-${position.left}% , -${position.top}%)`,
                  }}
                  onClick={() => {
                    setRemove(false);
                  }}
                  className="bodalBtn2"
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Recom />
      <Comment />
    </>
  );
};

export default BookDetail;
