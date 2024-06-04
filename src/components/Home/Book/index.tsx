import { useProduct } from "../../../Context";
import "./index.scss";
import Books from "./Books";
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

const Book = () => {
  const {
    sortChange,
    setCurrentPage,
    currentPage,
    displayedProducts,
    totalPages,
    res,
  } = useProduct();
  return (
    <div id="book">
      <div className="container">
        <div className="book">
          <div className="text">
            <h1>Возможно, Вам понравится</h1>
            <div className="df">
              <select name="Сортировка" id="" onChange={sortChange}>
                <option value="start">Сортировка</option>
                <option value="priceLowToHigh">По цене (по возрастанию)</option>
                <option value="priceHighToLow">По цене (по убыванию)</option>
                <option value="alphabetical">По буквам</option>
              </select>

              <div className="pagination"> 
                <button
                  style={{
                    cursor: currentPage === 1 ? "" : "pointer",
                    background: currentPage === 1 ? "#dad7d7" : "",
                    color: currentPage === 1 ? "#fff" : "",
                  }}
                  onClick={() =>
                    setCurrentPage(currentPage - (currentPage === 1 ? 0 : 1))
                  }
                >
                  {"<<"}
                </button>
                {res.map((el: number, idx: number) => (
                  <span
                    onClick={() => setCurrentPage(idx + 1)}
                    style={{
                      background: el !== currentPage ? "" : "#010049",
                      color: el !== currentPage ? "" : "white",
                    }}
                    key={idx}
                  >
                    {el}
                  </span>
                ))}
                <button
                  style={{
                    cursor: currentPage === totalPages ? "" : "pointer",
                    background: currentPage === totalPages ? "#dad7d7" : "",
                    color: currentPage === totalPages ? "#fff" : "",
                  }}
                  onClick={() =>
                    setCurrentPage(
                      currentPage + (currentPage === totalPages ? 0 : 1)
                    )
                  }
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
          <div className="text1">
            {displayedProducts.map((el: IProduct, index: number) => (
              <Books el={el} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
