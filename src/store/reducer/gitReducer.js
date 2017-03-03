import {GitAction} from '../action/gitAction'


const INITIAL_STATE = {
    gitData:{},
    loading: true,
    currentUser:{},
    complains:{},
    missings:{},
    crimes:{},
    report:{}
};

export function counterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GitAction.GetData:
            return Object.assign({}, state, { loading: true });
            
        //register user
        case GitAction.Register:
            return Object.assign({}, state, { loading: true });
        case GitAction.UserRegistered:
            return Object.assign({}, state, { loading: false, currentUser: action.payload });
        //==============

        //Login user
        case GitAction.Login:
            return Object.assign({}, state, { loading: true });
        case GitAction.UserLoggedInWithData:
            return Object.assign({}, state, { loading: false, currentUser: action.payload });
        //==============

        //ALL COMPLAINS
        case GitAction.GetComplain:
            return Object.assign({}, state, { loading: true });
        case GitAction.GotComplain:
            return Object.assign({}, state, { loading: false, complains: action.payload });
        //==============

        //ALL MISSINGS
        case GitAction.GetMissings:
            return Object.assign({}, state, { loading: true });
        case GitAction.GotMissings:
            return Object.assign({}, state, { loading: false, missings: action.payload });
        //==============

        //ALL CRIMES
        case GitAction.GetCrimes:
            return Object.assign({}, state, { loading: true });
        case GitAction.GotCrimes:
            return Object.assign({}, state, { loading: false, crimes: action.payload });
        //==============

        //FILE A REPORT
        case GitAction.FileReport:
            return Object.assign({}, state, { loading: true });
        case GitAction.Filed:
            return Object.assign({}, state, { loading: false, report: action.payload });
        //==============

        case GitAction.Success:
            return Object.assign({}, state, { loading: false, gitData: action.payload });
        case GitAction.Failure:
            return Object.assign({}, state, { loading: true })
        default:
            return state
    }
}