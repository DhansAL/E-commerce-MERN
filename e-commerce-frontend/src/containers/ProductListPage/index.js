import React from "react";
import Layout from "../../Components/Layout";
import getParams from "../../utils/getParams";
import { ProductPage } from "./ProductPage";
import { ProductStore } from "./ProductStore";
import ClothingAndAccessories from "./ClothingAndAccessories";
import "./style.css";

export default function ProductListPage(props) {
  const renderProducts = () => {
    const params = getParams(props.location.search);
    // console.log(props, params);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;

      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };

  return <Layout>{renderProducts()}</Layout>;
}
