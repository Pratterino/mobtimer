import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";
import "./index.scss";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
