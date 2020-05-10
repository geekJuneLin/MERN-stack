import React from "react";
import axios from "axios";

import { GET_SHOPPING_ITEMS, ITEMS_LOADING } from "./actions/types";
import { useDispatch, useSelector } from "react-redux";

import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";
import ShoppingList from "./components/ShoppingList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { loadUser } from "./actions/userActions";

function App() {
  // Dispatch & Selector hook
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  // Fetch shopping items
  React.useEffect(() => {
    // Auth user
    loadUser(dispatch, token);

    // Set items loading to true
    dispatch({
      type: ITEMS_LOADING,
    });

    axios.get("/api/items").then((res) =>
      dispatch({
        type: GET_SHOPPING_ITEMS,
        payload: res.data,
      })
    );
  }, []);

  return (
    <div className="App">
      <AppNavbar />
      <ItemModal />
      <ShoppingList />
    </div>
  );
}

export default App;
