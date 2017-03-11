import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500, grey900,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300, 
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
    color: grey900,
  },
});


ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={AboutComponent} />
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
