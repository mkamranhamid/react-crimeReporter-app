import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

//reducers
import { counterReducer } from './reducer/gitReducer';

//epics
import { gitEpic } from './epic/gitEpic';

const rootEpic = combineEpics(
  gitEpic.getUserData,
  gitEpic.registerUser,
  gitEpic.LoginUser,
  gitEpic.getAllComplains,
  gitEpic.getAllCrimes,
  gitEpic.getAllMissings,
  gitEpic.registerReport,
  gitEpic.getLoggedInUserData
)

const rootReducer = combineReducers({counterReducer})

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);


export default createStoreWithMiddleware(rootReducer);