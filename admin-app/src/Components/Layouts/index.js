import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header/index";
import "./style.css";

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/page"}>page</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>category</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>products</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
