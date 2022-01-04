import React from "react";
import ReactDOM from "react-dom";

// Libs
import { Provider } from "react-redux";

// Store
import { setupStore } from "./store/store";

// Components
import { App } from "./App";

// Styles
import "./index.scss";

ReactDOM.render(
    <Provider store={setupStore()}>
        <App />
    </Provider>,
    document.getElementById("root")
);
