import React from "react";
import axios from "axios";

import { Container, ListGroup, Button } from "react-bootstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_SHOPPING_ITEM } from "../actions/types";

const ShoppingList = () => {
  // Redux useSelector Hook
  const items = useSelector((state) => state.rootReducer.items);
  const dispatch = useDispatch();

  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        <TransitionGroup className="todo-list">
          {items &&
            items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroup.Item>
                  <Button
                    className="remove-btn"
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      // Send DELETE req to api
                      axios
                        .delete(`/api/items/${_id}`)
                        .then((res) => {
                          console.log(
                            `Successfully deleted the item with id: ${_id}`
                          );
                          dispatch({
                            type: DELETE_SHOPPING_ITEM,
                            payload: _id,
                          });
                          console.log("Executed the dispatch func");
                        })
                        .catch((err) =>
                          console.log(`DELETE error: ${err}, id:${_id}`)
                        )
                    }
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroup.Item>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
