import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userActions";
import { CLEAR_ERROR } from "../../actions/types";

import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Form,
  NavLink,
  Alert,
} from "react-bootstrap";

const LoginModal = () => {
  // Dispatch & Selector hook
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const errReducer = useSelector((state) => state.errorReducer);

  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(false);

  // Display or hide the modal
  const handleShowOnClick = () => {
    setShow(!show);
    if (err) {
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  };

  // Get the email and password
  const handleInputOnChange = (e) => {
    const type = e.target.type;
    switch (type) {
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

  // Handle log in btn onClick
  const handleLoginBtnOnClick = () => {
    const user = {
      email,
      password,
    };

    loginUser(dispatch, user);
  };

  // Lifecycle
  React.useEffect(() => {
    if (isAuthenticated) {
      setAuthenticated(true);
      handleShowOnClick();
    } else {
      setAuthenticated(null);
    }

    if (errReducer.id === "LOGIN_FAILED") {
      setErr(errReducer.msg);
    } else {
      setErr(null);
    }
  }, [isAuthenticated, errReducer.id]);

  return (
    <>
      <NavLink onClick={handleShowOnClick}>Login</NavLink>
      <Modal show={show} size="md" onHide={handleShowOnClick}>
        <Modal.Header closeButton className="font-weight-bold display-4">
          Login
        </Modal.Header>
        <ModalBody>
          {err && <Alert variant="danger">{err.error}</Alert>}
          <Form>
            <Form.Group>
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
          <Button variant="dark" block onClick={handleLoginBtnOnClick}>
            Login
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginModal;
