import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../Components/Layouts";
import Input from "../../Components/UI/Input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";

export default function SignUp() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const userSignUp = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  if (user.loading) {
    return <p>loading.. </p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignUp}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="first name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="last name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                placeholder="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="password"
                placeholder="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
