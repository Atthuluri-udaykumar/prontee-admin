import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css';
 import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {  Provider } from "react-redux"
import { store} from "./redux/Store"
import Routers from "./components/Router"


function App(props) {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar/>
          <Routers />
          </Router>
      </div>
      </Provider>
  );
}


export default App;
