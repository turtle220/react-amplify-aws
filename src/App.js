import React from 'react';
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { BrowserRouter} from 'react-router-dom';
import { createStore} from 'redux'
import { Provider } from 'react-redux';

import './App.css';
import Routeurl from './Service/route';
import rootReducer from './Service/reducer/index';
import { withAuthenticator } from 'aws-amplify-react';

const store = createStore(rootReducer);


function App() {
  return (
    <div className="App">


      <Provider store={store}>
        <BrowserRouter>
            <Routeurl/>
        </BrowserRouter>
      </Provider>

    </div>
    
  );
}

export default withAuthenticator(App, {includeGreetings: true});
