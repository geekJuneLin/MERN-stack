import React from "react";
import { useDispatch } from "react-redux";
import { LOGOUT_SUCCES } from "../../actions/types";

import { NavLink } from "react-bootstrap";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogoutOnClick = () => {
    dispatch({
      type: LOGOUT_SUCCES,
    });
  };

  return (
    <>
      <NavLink onClick={handleLogoutOnClick}>Logout</NavLink>
    </>
  );
};

export default Logout;
