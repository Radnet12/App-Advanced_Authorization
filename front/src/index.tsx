import React from "react";
import ReactDOM from "react-dom";

// Libs
import { Provider } from "react-redux";

// Store
import { setupStore } from "./store/store";

// Components
import { App } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
