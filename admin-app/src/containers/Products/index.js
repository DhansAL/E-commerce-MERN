import React, { useState } from "react";
import Layout from "../../Components/Layouts";
import { Col, Container, Modal, Row, Table } from "react-bootstrap";
import Input from "../../Components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions/";
import UIModal from "../../Components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

export default function Products() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [productDetailModal, setProductDetailModal] = useState(false);

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  const [show, setShow] = useState(false);

  const product = useSelector((state) => state.product);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => ShowProductDetailsModal(product)}
                  key={product._id}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModal = () => {
    return (
      <UIModal
        show={show}
        handleClose={handleClose}
        modalTitle="add new PRODUCT"
      >
        <Input
          label="name"
          value={name}
          placeholder={"Product name"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantiti"
          value={quantity}
          placeholder={"quantity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="price"
          value={price}
          placeholder={"price"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={"descriiption"}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input type="file" name="name" onChange={handleProductPictures} />
      </UIModal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const ShowProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
    console.log(product);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <UIModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="key">quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md="6">
            <label className="key">descriiption</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex" }}>
            {productDetails.productPictures.map((picture) => (
              <div className="productImgContainer">
                <img src={generatePublicUrl(picture.img)} />
              </div>
            ))}
          </Col>
        </Row>
      </UIModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        {" "}
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>add</button>
            </div>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col>{renderProducts()}</Col>
      </Row>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
}
