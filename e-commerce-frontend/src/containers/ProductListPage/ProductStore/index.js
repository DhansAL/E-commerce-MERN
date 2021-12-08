import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import "./style.css";
import Card from "../../../Components/UI/Card";

export const ProductStore = (props) => {
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  useEffect(() => {
    const { match } = props;

    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            className="card"
            headerLeft={`1${props.match.params.slug} mobile under ${priceRange[key]}`}
            style={{ margin: "20px" }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block" }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      // src={generatePublicUrl(product.productPictures[0])} //error{didn\t granted permissions to show local files on localhost }
                      src="https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/q/8/f/apple-iphone-12-dummyapplefsn-original-imafwg8dbzv8vh7t.jpeg?q=70"
                      alt="iphone xr"
                    />
                  </div>
                  <div>
                    <div>{product.name}</div>
                    <div>
                      <span>4.3</span>
                    </div>
                    <span>{product.price}</span>
                  </div>
                  <div>5000</div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};
