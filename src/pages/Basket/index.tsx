import React, { useEffect, useState } from "react";
import { useProduct } from "../../Context";
import "./index.scss";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
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
const Basket = () => {
  const { basket, Remove, IF } = useProduct();

  const [mouse, setMouse] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <div id="basket">
      {basket.length !== 0 ? (
        <div className="container">
          <div className="basket">
            <h1>Your cart</h1>
            <h2>
              Not ready to checkout?{" "}
              <Link to="/">
                <span>Continue Shopping</span>
              </Link>
            </h2>
            <div className="text">
              <div className="block">
                {basket.map((el: IProduct, index: number) => (
                  <div className="block--blocks" key={index}>
                    <img src={el.img} alt="" />
                    <div className="block--blocks__text">
                      <div className="block1">
                        <div>
                          <h1>{el.name}</h1>
                          <button onClick={() => Remove(el.id)}>Remove</button>
                        </div>
                        <p>by {el.genres}</p>
                      </div>
                      <div className="block2">
                        <h3>Quantity: {el.count}</h3>
                        <h2>
                          ${+String(el.price / 89).slice(0, 3) * el.count}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="blocks1">
                <h1>Order Summary</h1>
                <div className="blocks1--text">
                  <div>
                    <h3>Shipping</h3>
                    <h2>
                      Select Method{" "}
                      <span>
                        <AiOutlineRight />
                      </span>
                    </h2>
                  </div>
                  <div>
                    <h3>Payment</h3>
                    <h2>
                      Select Method{" "}
                      <span>
                        <AiOutlineRight />
                      </span>
                    </h2>
                  </div>
                  <div className="df"></div>
                  <div>
                    <h3>Total</h3>
                    <h4>$188</h4>
                  </div>
                </div>
                <button>Continue to checkout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="baskets">
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
              Корзина
            </span>{" "}
          </h1>
          <h1>There are no books in the cart</h1>
        </div>
      )}
    </div>
  );
};

export default Basket;
