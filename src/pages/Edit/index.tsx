import React, { useState } from "react";
import img from "../Admin/img/Img_box.svg";
import "./index.scss";
import { useProduct } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";

interface IProduct {
  id: number;
  name: string;
  by: string;
  descr: string;
  img: string | null;
  price: string;
  genres: string;
  count: number;
  basket: boolean;
}
interface IValue {
  url: string | null;
  productName: string;
  category: string;
  price: string;
  description: string;
}
interface IError {
  error2: boolean;
  error3: boolean;
  error4: boolean;
  error5: boolean;
}
const Edit: React.FC = () => {
  const { setProduct, product, IF } = useProduct();
  const { edit } = useParams();
  const [data, setData] = useState<IProduct>(
    [...product].filter((el: IProduct) => el.id === Number(edit))[0]
  );
  const [mouse, setMouse] = useState<number>(0);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    input: "input-container",
    input1: "input-container",
    input2: "input-container",
    input3: "input-container",
    input4: "input-container",
  });

  const [value, setValue] = useState<IValue>({
    url: data.img,
    productName: data.name,
    category: data.genres,
    price: data.price,
    description: data.descr,
  });
  const [error, setError] = useState<IError>({
    error2: false,
    error3: false,
    error4: false,
    error5: false,
  });
  function Img(e: React.ChangeEvent<HTMLInputElement>): void {
    let file: any = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        if (!ctx) return;
        let maxWidth = 800; // Максимальная ширина изображения
        let maxHeight = 600; // Максимальная высота изображения
        let width = img.width;
        let height = img.height;

        // Уменьшаем размер изображения, если он больше максимального размера
        if (width > maxWidth || height > maxHeight) {
          let ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height); // Рисуем изображение на canvas с измененными размерами
        let compressedUrl = canvas.toDataURL("image/jpeg"); // Преобразуем canvas в URL изображения
        setValue({ ...value, url: compressedUrl }); // Устанавливаем уменьшенное изображение в URL
      };
    };
    reader.onerror = () => {
      console.log("file", reader.error);
    };
  }
  function getProductName(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue({ ...value, productName: e.target.value });
    setError({ ...error, error2: false });
  }
  function getCategory(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue({ ...value, category: e.target.value });
    setError({ ...error, error3: false });
  }
  function getPrice(e: React.ChangeEvent<HTMLInputElement>): void {
    let str = e.target.value;
    str = str
      .split("")
      .filter((el) => +el || el === "0" || el === ".")
      .join("")
      .slice(0, 4);
    setValue({ ...value, price: str });
    setError({ ...error, error4: false });
  }
  function getDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setValue({ ...value, description: e.target.value });
    setError({ ...error, error5: false });
  }

  function getAdmin() {
    if (
      value.url !== null &&
      value.productName.length > 3 &&
      value.category !== "" &&
      value.price !== "" &&
      value.description.length > 7
    ) {
      let editProduct =
        JSON.parse(localStorage.getItem("data") as string) || [];
      editProduct.map((el: IProduct) => {
        if (el.id === Number(edit)) {
          return {
            ...el,
            img: (el.img = value.url),
            name: (el.name = value.productName),
            genres: (el.genres = value.category),
            price: (el.price = value.price),
            descr: (el.descr = value.description),
          };
        }
        return el;
      });
      localStorage.setItem("data", JSON.stringify(editProduct));
      setProduct(editProduct);
      setValue({...value, url:value.url = null})
      setValue({...value, productName:value.productName = ''})
      setValue({...value, category:value.category = ''})
      setValue({...value, price:value.price = ''})
      setValue({...value, description: value.description = ''})
      navigate('/')
    }
    if (value.url === null) {
      setInputs({ ...inputs, input: "shake" });
      setTimeout(() => {
        setInputs({ ...inputs, input: "input-container" });
      }, 600);
    }
    if (value.productName.length < 3) {
      setInputs({ ...inputs, input1: "shake" });

      setTimeout(() => {
        setInputs({ ...inputs, input1: "input-container" });
      }, 600);
      setError({ ...error, error2: true });
    }
    if (value.category.length === 0) {
      setInputs({ ...inputs, input2: "shake" });
      setTimeout(() => {
        setInputs({ ...inputs, input2: "input-container" });
      }, 600);
      setError({ ...error, error3: true });
    }
    if (value.price.length === 0) {
      setInputs({ ...inputs, input3: "shake" });
      setTimeout(() => {
        setInputs({ ...inputs, input3: "input-container" });
      }, 600);
      setError({ ...error, error4: true });
    }
    if (value.description.length < 7) {
      setInputs({ ...inputs, input4: "shake" });
      setTimeout(() => {
        setInputs({ ...inputs, input4: "input-container" });
      }, 600);
      setError({ ...error, error5: true });
    }
  }

  return (
    <div id="edit">
      <div className="container">
        <div className="edit">
          {/* <h1 className="router">
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
              Эдит
            </span>{" "}
          </h1>
          {url ? (
            <div
              style={{
                background: `url(${url}) no-repeat center/cover`,
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
              className="url"
            >
              {" "}
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={Img}
              />
            </div>
          ) : (
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
              className={`url ${input}`}
            >
              <img src={img} alt="" />
              <h2>Upload photo</h2>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={Img}
              />
            </div>
          )}
          <div className="block">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                value={productName}
                onChange={getProductName}
                type="text"
                placeholder="Product Name"
                className={input1}
                style={{
                  border: error2 ? "1px solid red" : "",
                }}
              />
              <div className="inputs">
                <input
                  value={category}
                  onChange={getCategory}
                  className={`inputs1 ${input2}`}
                  type="text"
                  placeholder="Category"
                  style={{
                    border: error3 ? "1px solid red" : "",
                  }}
                />
                <input
                  value={price}
                  onChange={getPrice}
                  className={`inputs2 ${input3}`}
                  type="text"
                  placeholder="Price"
                  style={{
                    border: error4 ? "1px solid red" : "",
                  }}
                />
              </div>
              <textarea
                className={input4}
                value={description}
                onChange={getDescription}
                placeholder="Product description..."
                style={{
                  border: error5 ? "1px solid red" : "",
                }}
              ></textarea>
              <button onClick={getAdmin}>SAVE</button>
            </form>
          </div> */}
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
              Эдит
            </span>{" "}
          </h1>
          {value.url ? (
            <div
              style={{
                background: `url(${value.url}) no-repeat center/cover`,
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
              className="url"
            >
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={Img}
              />
            </div>
          ) : (
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
              className={`url ${inputs.input}`}
            >
              <img src={img} alt="" />
              <h2>Upload photo</h2>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={Img}
              />
            </div>
          )}
          <div className="block">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                value={value.productName}
                onChange={getProductName}
                type="text"
                placeholder="Product Name"
                className={inputs.input1}
                style={{
                  border: error.error2 ? "1px solid red" : "",
                }}
              />
              <div className="inputs">
                <input
                  value={value.category}
                  onChange={getCategory}
                  className={`inputs1 ${inputs.input2}`}
                  type="text"
                  placeholder="Category"
                  style={{
                    border: error.error3 ? "1px solid red" : "",
                  }}
                />
                <input
                  value={value.price}
                  onChange={getPrice}
                  className={`inputs2 ${inputs.input3}`}
                  type="text"
                  placeholder="Price"
                  style={{
                    border: error.error4 ? "1px solid red" : "",
                  }}
                />
              </div>
              <textarea
                className={inputs.input4}
                value={value.description}
                onChange={getDescription}
                placeholder="Product description..."
                style={{
                  border: error.error5 ? "1px solid red" : "",
                }}
              ></textarea>
              <button onClick={getAdmin}>SAVE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
