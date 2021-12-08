import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../Components/Layouts";
import "./style.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Layout sidebar>
        {/* <div
          style={{ marginTop: "4rem" }}
          className="container-fluid bg-light p-5 text-center"
        >
          <h1>welcome to admin dashboard</h1>
          <p>
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions hav
          </p>
        </div> */}
      </Layout>
    </div>
  );
}
