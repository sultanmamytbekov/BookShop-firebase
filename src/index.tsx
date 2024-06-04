import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductСontext from "./Context";
import CommitContextProvider from "./BaskretContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <ProductСontext>
      <CommitContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CommitContextProvider>
    </ProductСontext>
);
