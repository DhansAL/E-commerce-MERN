import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  let input = null;
  switch (props.type) {
    case "text":
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <select
            className="form-control form-control-sm"
            value={props.value}
            onChange={props.onChange}
          >
            <option>{props.placeholder} </option>
            {props.options.length > 0
              ? props.options.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))
              : "null"}
          </select>
        </Form.Group>
      );
      break;
    // case "select":
    //   break;

    default:
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <Form.Text className="text-muted">{props.errorMessage} </Form.Text>
        </Form.Group>
      );
      break;
  }

  return input;
}
