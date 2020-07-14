import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "@aws-amplify/core";
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'

import config from "./aws-exports";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Routeurl from './Service/route.js'
// import Blog from './Components/BlogComoponent.js';

Amplify.configure(config);

ReactDOM.render( <App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
