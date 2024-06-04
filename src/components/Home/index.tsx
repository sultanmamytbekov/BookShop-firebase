import React, { useEffect, useState } from "react";
import img from "../Home/img/nome.png";
import img1 from "./img/582655846-theexchange_bookshop_2048x600.webp";
import img2 from "./img/Tartt_The-Secret-History_Bookshop-desktop-2048x600-v01.webp";
import "./index.scss";
import Categories from "./Categories";
import Book from "./Book";

const Home: React.FC = () => {
  const [time, setTime] = useState(1);
  const [url, setUrl] = useState(img);
  useEffect(() => {
    {
      if (time === 1) {
        setUrl(img);
      } else if (time === 2) {
        setUrl(img1);
      } else if (time === 3) {
        setUrl(img2);
      }
    }
    {
      if (time === 4) {
        setTime(1);
      } else {
        setTimeout(() => {
          setTime(time + 1);
        }, 6000);
      }
    }
  }, [time]);

  return (
    <>
      <div
        style={{
          background: `url(${url}) no-repeat center/cover`,
          transition: "2s",
        }}
        id="home"
      >
        <div className="container">
          <div className="home"></div>
        </div>
      </div>
      <Categories />
      <Book />
    </>
  );
};

export default Home;
