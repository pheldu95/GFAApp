import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import ScrollToTop from './app/layout/ScrollToTop';
//make our own history object that axios or mobx can access
//will we use this to direct users to the notfound component whenever we get a 404
//we will import history into our agent.ts file and use it to history.push('/notfound'). redirect users to not found page
export const history = createBrowserHistory();
ReactDOM.render(
  //make our history object available to the Router
  <Router history={history}>
  {/* wrap ScrollToTop around the App component. loading new component scrolls to top of page */}
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
