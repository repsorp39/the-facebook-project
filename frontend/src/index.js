import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from './store';
import "./index.css";
import "../node_modules/bulma/css/bulma.css";
import { fetchUser } from './store/features/user-slice';

store.dispatch(fetchUser());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>
);

