import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Form,
  NavLink,
  Alert,
} from "react-bootstrap";

import { registerUser } from "../../actions/userActions";
import { clearError } from "../../actions/errorActions";

const RegisterModal = () => {
  // Dispatch & Selector hook
  const dispatch = useDispatch();
  const errFromReducer = useSelector((state) => state.errorReducer);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const [show, setShow] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleShowOnClick = () => {
    setShow(true);
  };

  const handleToggle = () => {
    clearError(dispatch);
    setShow(!show);
  };

  const handleInputOnChange = (e) => {
    const type = e.target.type;
    switch (type) {
      case "text":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegisterBtnOnClick = () => {
    const newUser = {
      name,
      email,
      password,
    };
    registerUser(newUser, dispatch);
  };

  // Listening for errFromReducer
  React.useEffect(() => {
    if (errFromReducer.id === "REGISTER_FAILED") {
      setError(errFromReducer.msg);
    } else {
      setError(null);
    }

    if (show) {
      if (isAuthenticated) handleToggle();
    }
  }, [errFromReducer, isAuthenticated]);

  return (
    <>
      <NavLink onClick={handleShowOnClick}>Register</NavLink>
      <Modal show={show} size="md" onHide={handleToggle}>
        <Modal.Header closeButton className="font-weight-bold display-4">
          Register
        </Modal.Header>
        <ModalBody>
          {error && <Alert variant="danger">{error.error}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className="mb-4"
                onChange={handleInputOnChange}
              ></Form.Control>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                className="mb-4"
                onChange={handleInputOnChange}
              ></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-4"
                onChange={handleInputOnChange}
              ></Form.Control>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="dark" block onClick={handleRegisterBtnOnClick}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegisterModal;
