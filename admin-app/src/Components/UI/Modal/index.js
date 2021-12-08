import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function UIModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, idx) => (
            <Button key={idx} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            variant="primary"
            {...props}
            className="btn-sm"
            onClick={props.onSubmit}
          >
            save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
