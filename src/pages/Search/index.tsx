import React, { useState } from "react";
import { useProduct } from "../../Context";
import Books from "../../components/Home/Book/Books";
import "./index.scss";
import { useNavigate } from "react-router-dom";
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
const Search = () => {
  const { IF, Search } = useProduct();
  const [mouse, setMouse] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div id="search">
      <div className="container">
        <div
          style={{
            height: Search().length === 0 ? "70vh" : "",
          }}
          className="search"
        >
          <h1 className="router">
            <span
              onClick={() => navigate("/")}
              onMouseLeave={() => setMouse(0)}
              onMouseOver={() => setMouse(1)}
              className="span"
            >
              Главная /
            </span>{" "}
            <span
              onMouseLeave={() => setMouse(0)}
              onMouseOver={() => setMouse(2)}
              style={{ color: IF(mouse) }}
            >
              Поиск
            </span>{" "}
          </h1>
          {Search().length === 0 ? (
            <h1>По вашему запросу ничего не найдено</h1>
          ) : (
            <div className="text">
              {Search().map((el: IProduct, index: number) => (
                <Books key={index} el={el} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
