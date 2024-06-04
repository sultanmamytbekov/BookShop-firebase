import React from "react";
import { useProduct } from "../../../Context";
import { Link } from "react-router-dom";
import img from "./img/Vector.svg";
import "./index.scss";
interface IProduct {
  id: 18;
  name: string;
  by: string;
  descr: string;
  img: string;
  price: number;
  genres: string;
  count: number;
}
const Recom = () => {
  const { filter } = useProduct();
  return (
    <div id="recom">
      <div className="container">
        <div className="recom">
          <h1>Возможно, Вам понравится</h1>
          <div className="text">
            {filter.slice(0, 5).map((el: IProduct, index: number) => (
              <div
                key={index}
                onClick={() => {
                  window.scroll(100, 100);
                }}
                className="block"
              >
                <Link to={`/bookDetail/${el.id}`}>
                  <img className="img" src={el.img} alt="" />
                </Link>
                <div>
                  <h2>{el.price} сом</h2>
                  <img src={img} alt="" />
                </div>
                <p>{el.genres}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recom;
