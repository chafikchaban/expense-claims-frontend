import React from 'react';
import ReactDOM from 'react-dom';
import { resetContext, getContext } from 'kea';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
/* 
import {configureStore} from 'redux-starter-kit';
import homePageReducer from './pages/HomePage/homePage'; 
const store = configureStore({
    reducer : {
        Home : homePageReducer
    }
}); */

resetContext({
  createStore: {
    // options for redux (e.g. middleware, reducers, ...)
  },
  plugins: [
    // additional kea plugins
  ],
})

ReactDOM.render(
  <Provider store={getContext().store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
