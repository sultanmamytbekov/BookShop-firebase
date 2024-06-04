import React from "react";
import "./index.scss";
import img from "./img/Arrow 1.svg";
import card1 from "./img/card1.png";
import card2 from "./img/card2.png";
import card3 from "./img/card3.png";
import card4 from "./img/card4.png";
import { Link } from "react-router-dom";
const Categories: React.FC = () => {
  return (
    <div id="categories">
      <div className="container">
        <div className="categories">
          <h1>Категории</h1>
          <div className="text">
            <Link to="psychology/Детектив">
              <div
                style={{
                  background: `url(${card1}) no-repeat center/cover`,
                }}
                className="block1"
              >
                <h2>
                  Детектив <img src={img} alt="" />
                </h2>
              </div>
            </Link>
            <Link to="psychology/Фантастика">
              <div
                style={{
                  background: `url(${card2}) no-repeat center/cover`,
                }}
                className="block2"
              >
                <h2>
                  Фантастика <img src={img} alt="" />
                </h2>
              </div>
            </Link>
            <Link to="psychology/Приключения">
              <div
                style={{
                  background: `url(${card3}) no-repeat center/cover`,
                }}
                className="block3"
              >
                <h2>
                  Приключения <img src={img} alt="" />
                </h2>
              </div>
            </Link>
            <Link to="psychology/Научная">
              <div
                style={{
                  background: `url(${card4}) no-repeat center/cover`,
                }}
                className="block4"
              >
                <h2>
                  Научная <img src={img} alt="" />
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
