import React from "react";
import axios from "axios";

import { ADD_SHOPPING_ITEM } from "../actions/types";
import { useDispatch } from "react-redux";

import {
  Container,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Form,
} from "react-bootstrap";

const ItemModal = () => {
  // useDispatch hook
  const dispatch = useDispatch();

  // Show hook
  const [show, setShow] = React.useState(false);

  // Textarea value hook
  const [name, setName] = React.useState("");

  // Handle onShow
  const handleOnShow = () => {
    setShow(true);
  };

  // Handle onHide
  const handleOnHide = () => setShow(false);

  // Handle textarea onChange
  const handleTextareaOnChange = (e) => {
    setName(e.target.value);
  };

  // Handle Add item onClick
  const handleAddItemOnClick = (e) => {
    e.preventDefault();

    // Send POST request to api
    axios
      .post("/api/items", { name: name })
      .then((res) => {
        dispatch({
          type: ADD_SHOPPING_ITEM,
          payload: res.data,
        });
      })
      .catch((err) => console.log(`POST error: ${err}`));

    handleOnHide();
  };

  return (
    <Container className="my-4">
      <Button onClick={handleOnShow} variant="dark">
        Add item
      </Button>
      <Modal show={show} onHide={handleOnHide} size="lg">
        <Modal.Header closeButton>Add To Shopping List</Modal.Header>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Add Item</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Add Shopping Item"
                onChange={handleTextareaOnChange}
              ></Form.Control>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="dark" block onClick={handleAddItemOnClick}>
            Add Item
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ItemModal;
