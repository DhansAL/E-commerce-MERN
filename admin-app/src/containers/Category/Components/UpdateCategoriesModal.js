import React from "react";
import Input from "../../../Components/UI/Input";
import UIModal from "../../../Components/UI/Modal";
import { Col, Container, Row } from "react-bootstrap";

const UpdateCategoriesModal = (props) => {
  const {
    size,
    show,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    onSubmit,
  } = props;

  return (
    // edit categories
    <UIModal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Row>
          );
        })}

      {/*
      !!!!!!!!!!!!!CHECKED CATEGORIES!!!!!!!!!!!!!
       */}
      <h6>Checked categories </h6>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Row>
          );
        })}

      {/* <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          /> */}
    </UIModal>
  );
};

export default UpdateCategoriesModal;
