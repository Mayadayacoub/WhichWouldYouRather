import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import "semantic-ui-css/semantic.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import middleware from "./middleware";
const store = createStore(reducers, middleware);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
