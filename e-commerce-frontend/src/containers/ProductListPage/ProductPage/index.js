import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../Components/UI/Card";

export const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: " 0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <div>
              <a
                key={index}
                style={{ display: "block" }}
                href={banner.navigateTo}
              >
                <img
                  // src={banner.img}
                  // src="http://prod-upp-image-read.ft.com/df4b324e-d3fe-11e9-8d46-8def889b4137"
                  src="https://thumbs.dreamstime.com/b/february-usa-new-york-clubhouse-audio-chat-application-view-smartphone-iphone-pro-banner-long-format-february-usa-new-york-215584235.jpg"
                  alt="img of banner"
                />
              </a>
              <p className="legend">leghed 1</p>
            </div>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px 0",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              style={{ width: "400px", height: "200px", margin: "0 5px" }}
              key={index}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                // src={product.img}
                src="https://rukminim1.flixcart.com/image/312/312/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70"
                alt="productImg"
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
