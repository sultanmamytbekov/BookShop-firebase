import React, { useEffect, useState } from "react";
import "./index.scss";
import img from "../../components/Home/Categories/img/Arrow 1.svg";
import card1 from "../../components/Home/Categories/img/card1.png";
import card2 from "../../components/Home/Categories/img/card2.png";
import card3 from "../../components/Home/Categories/img/card3.png";
import card4 from "../../components/Home/Categories/img/card4.png";
import { useProduct } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";
import Books from "../../components/Home/Book/Books";
import { IoIosArrowRoundDown } from "react-icons/io";
interface IProduct {
  id: number;
  name: string;
  by: string;
  descr: string;
  img: string;
  price: number;
  genres: string;
  count: number;
}

const Psychology = () => {
  const { sortChange, IF, setCategories, Categories } = useProduct();
  const [mouse, setMouse] = useState<number>(0);
  const navigate = useNavigate();
  const { categories } = useParams();
  const [slice, setSlice] = useState(false);
  useEffect(() => {
    setCategories(categories);
  }, [categories]);
  return (
    <div id="psychology">
      <div className="container">
        <div className="psychology">
          <h1 className="router">
            <span
              onClick={() => navigate("/")}
              onMouseLeave={() => setMouse(0)}
              onMouseOver={() => setMouse(1)}
              className="span"
            >
              Главная /
            </span>{" "}
            {categories === undefined ? (
              <span
                onClick={() => navigate("/psychology")}
                onMouseLeave={() => setMouse(0)}
                onMouseOver={() => setMouse(2)}
                style={{ color: IF(mouse) }}
                className="span"
              >
                Психологи
              </span>
            ) : (
              <span
                onClick={() => navigate("/psychology")}
                onMouseLeave={() => setMouse(0)}
                onMouseOver={() => setMouse(1)}
                className="span"
              >
                Психологи /
              </span>
            )}
            <span
              onMouseLeave={() => setMouse(0)}
              onMouseOver={() => setMouse(2)}
              style={{ color: IF(mouse) }}
            >
              {` ${categories === undefined ? "" : categories}`}
            </span>{" "}
          </h1>
          <div className="text">
            <div
              onClick={() => navigate("/psychology/Детектив")}
              style={{
                background: `url(${card1}) no-repeat center/cover`,
              }}
              className="block1"
            >
              <h2>
                Детектив <img src={img} alt="" />
              </h2>
            </div>
            <div
              onClick={() => navigate("/psychology/Фантастика")}
              style={{
                background: `url(${card2}) no-repeat center/cover`,
              }}
              className="block2"
            >
              <h2>
                Фантастика <img src={img} alt="" />
              </h2>
            </div>
            <div
              onClick={() => navigate("/psychology/Приключения")}
              style={{
                background: `url(${card3}) no-repeat center/cover`,
              }}
              className="block3"
            >
              <h2>
                Приключения <img src={img} alt="" />
              </h2>
            </div>
            <div
              onClick={() => navigate("/psychology/Научная")}
              style={{
                background: `url(${card4}) no-repeat center/cover`,
              }}
              className="block4"
            >
              <h2>
                Научная <img src={img} alt="" />
              </h2>
            </div>
          </div>
          <div className="text1">
            <div className="df">
              <select name="Сортировка" id="" onChange={sortChange}>
                <option value="start">Сортировка</option>
                <option value="priceLowToHigh">По цене (по возрастанию)</option>
                <option value="priceHighToLow">По цене (по убыванию)</option>
                <option value="alphabetical">По буквам</option>
              </select>
            </div>
          </div>
          <div className="text2">
            <div className="text1">
              {Categories()
                .slice(0, slice ? Categories()?.length : 10)
                .map((el: IProduct, index: number) => (
                  <Books el={el} key={index} />
                ))}
            </div>
            <center>
              <button
                style={{
                  display: Categories().length > 10 ? "flex" : "none",
                }}
                onClick={() => {
                  setSlice(!slice);
                }}
              >
                {slice ? "Свернуть" : "Показать ещё"}{" "}
                <span
                  style={{
                    rotate: slice ? "180deg" : "",
                  }}
                >
                  <IoIosArrowRoundDown />
                </span>
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Psychology;
