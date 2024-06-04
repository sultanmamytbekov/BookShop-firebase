import React from "react";
import img from "../../img/BOOKShop.png";
import img1 from "./img/img1.svg";
import img2 from "./img/img2.svg";
import img3 from "./img/img3.svg";
import img4 from "./img/img4.svg";
import "./index.scss";
const Footer: React.FC = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="footer">
          <div className="block1">
            <img src={img} alt="" />           
          </div>
          <div className="block2">
            <h2>Способ оплаты</h2>
            <h2>Условия доставки</h2>
            <h2>Правила покупки</h2>
          </div>
          <div className="block3">
            <h2>FAQ</h2>
            <h2>О нас</h2>
          </div>
          <div className="block4">
            <h1>Связаться с нами:</h1>
            <h2>+996 222 533 735</h2>
            <h2>+996 222 533 735</h2>
            <h2>+996 222 533 735</h2>
            <div>
              <img src={img1} alt="" />
              <img src={img2} alt="" />
              <img src={img3} alt="" />
              <img src={img4} alt="" />
            </div>
          </div>
          <div className="block5">
            <h1>Адрес</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in
              dolor viverra feugiat neque, sed in. Mattis volutpat malesuada
              velit parturient aliquam, est. Mauris vitae velit laoreet faucibus
              nec amet velit.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
