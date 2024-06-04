import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

const context = createContext();
export const useProduct = () => useContext(context);
const ProductСontext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [newProduct, setNewProduct] = useState([...product]);
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );
  function Product() {
    if (product.length === 0) {
      localStorage.setItem("data", JSON.stringify(data));
      setProduct(data);
      return;
    }
    const newData = JSON.parse(localStorage.getItem("data")) || [];
    setProduct(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  }
  useEffect(() => {
    Product();
  }, []);

  const [sortBy, setSortBy] = useState("default");
  const sortChange = (e) => {
    setSortBy(e.target.value);
  };
  function SortProduct() {
    switch (sortBy) {
      case "priceLowToHigh": {
        return newProduct.sort((a, b) => a.price - b.price);
      }
      case "priceHighToLow": {
        return newProduct.sort((a, b) => b.price - a.price);
      }
      case "alphabetical": {
        return newProduct.sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      default:
        return product;
    }
  }

  function IF(mouse) {
    if (mouse === 1) {
      return "#757575";
    } else if (mouse === 2) {
      return "black";
    } else {
      return "black";
    }
  }

  const [filter, setFilter] = useState([...product]);

  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  function Find() {
    const baskets = JSON.parse(localStorage.getItem("basket")) || [];
    const data = JSON.parse(localStorage.getItem("data")) || [];
    data.forEach((el) => {
      let foundEl = baskets.find((item) => item.id === el.id);
      if (foundEl) {
        return (el.basket = true);
      } else {
        return (el.basket = false);
      }
    });
    localStorage.setItem("data", JSON.stringify(data));
    setProduct(data);
  }

  useEffect(() => {
    setFilter(shuffleArray(filter));
  }, []);

  function Basket(el) {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    if (basket.some((item) => item.id === el.id)) {
      return;
    }
    basket.push(el);
    localStorage.setItem("basket", JSON.stringify(basket));
    setBasket(basket);
    Find();
  }
  function Remove(id) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket = basket.filter((el) => el.id !== id);
    localStorage.setItem("basket", JSON.stringify(basket));
    setBasket(basket);
    Find();
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedProducts = SortProduct().slice(start, end);
  const totalPages = Math.ceil(SortProduct().length / itemsPerPage);
  let res = [];
  for (let i = 1; i <= totalPages; i++) {
    res.push(i);
  }
  const [categories, setCategories] = useState("default");
  const [search, setSearch] = useState("");
  function Categories() {
    switch (categories) {
      case "Детектив": {
        return SortProduct().filter((el) => el.genres === "Исскуство");
      }
      case "Фантастика": {
        return SortProduct().filter((el) => el.genres === "Фантастика");
      }
      case "Приключения": {
        return SortProduct().filter((el) => el.genres === "Психология");
      }
      case "Научная": {
        return SortProduct().filter((el) => el.genres === "Мотивация");
      }
      default: {
        return SortProduct();
      }
    }
  }
  function Search() {
    return product.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    Search();
  }, [search]);

  function RemoveProduct(id) {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data = data.filter((el) => el.id !== id);
    localStorage.setItem("data", JSON.stringify(data));
    setProduct(data);
  }
  function User() {
    const listen = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      listen();
    };
  }

  useEffect(() => {
    User();
  });
  function SignOut() {
    signOut(auth);
  }

  const values = {
    product,
    sortChange,
    SortProduct,
    IF,
    filter,
    basket,
    setBasket,
    setProduct,
    Basket,
    Remove,
    setCurrentPage,
    currentPage,
    displayedProducts,
    totalPages,
    res,
    setCategories,
    Categories,
    setSearch,
    Search,
    RemoveProduct,
    user,
    setUser,
    SignOut,
  };
  return <context.Provider value={values}>{children}</context.Provider>;
};
export default ProductСontext;
