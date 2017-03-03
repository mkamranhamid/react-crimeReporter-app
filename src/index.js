import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';



import store  from './store/index';
import App from './app/App';
import AboutComponent from './components/about/about.component';
import HomeComponent from './components/home/home.component';
import ServiceComponent from './components/service/services.component';
import CrimeComponent from './components/crime/crime.component';
import MissingPersonComponent from './components/missingPerson/missingperson.component';
import ComplainComponent from './components/complains/complain.component';

import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HomeComponent} />
          <Route path="/complains" component={ServiceComponent} />
          <Route path="/crime" component={CrimeComponent} />
          <Route path="/registercomplain" component={ServiceComponent} />
          <Route path="/missingPerson" component={MissingPersonComponent} />
          <Route path="/complain" component={ComplainComponent} />
          <Route path="/login" component={AboutComponent} />
          <Route path="/signup" component={HomeComponent} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>),
  document.getElementById('root')
);
