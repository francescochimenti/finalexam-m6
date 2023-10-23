import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducers from "../src/reducers/postReducers";
import getCommentToggle from "../src/reducers/getCommentToggle";
import mailReducer from "./reducers/mailReducer";

//just a simple reducer to combine all reducers

const reducer = combineReducers({
  posts: postReducers,
  commentToggle: getCommentToggle,
  email: mailReducer,
});

const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
