import { createAction } from 'redux-actions';

export class GitAction {
    
    static GetData = 'GETDATA';
    static Success = 'SUCCESS';
    static Failure = 'FAILURE';
    // Signup
    static Register = 'REGISTER';
    static UserRegistered = 'SUCCESSFULLY-CREATED-USER';

    // Login
    static Login = 'LOGIN';
    static UserLoggedIn = 'SUCCESSFULLY-LOGIN';
    static UserLoggedInWithData = 'SUCCESSFULLY-LOGIN-WITH-DATA';
    
    
    // COMPLAIN
    static GetComplain = 'GET-COMPLAIN';
    static GotComplain = 'GOT-COMPLAIN';

    // MISSINGS
    static GetMissings = 'GET-MISSINGS';
    static GotMissings = 'GOT-MISSINGS';

    // CRIMES
    static GetCrimes = 'GET-CRIMES';
    static GotCrimes = 'GOT-CRIMES';

    // REPORT
    static FileReport = 'File-REPORT';
    static Filed = 'FILED';

    //LOGOUT
    static Logout = 'LOGOUT';
    static succfullyLogout = 'SUCCESSFULLY-LOGGED-OUT';

    static CallGetData(somedata) {
        return {
            type: GitAction.GetData,
            payload: somedata
        }
    }
    
    static CallSignup(credentials) {
        return {
            type: GitAction.Register,
            payload: credentials
        }
    }
    
    static CallLogin(credentials) {
        return {
            type: GitAction.Login,
            payload: credentials
        }
    }

    static CallAllComplains() {
        return {
            type: GitAction.GetComplain
        }
    }
    
    static CallAllMissings() {
        return {
            type: GitAction.GetMissings
        }
    }
    
    static CallAllCrime() {
        return {
            type: GitAction.GetCrimes
        }
    }
    
    static CallFileAReport(somedata) {
        return {
            type: GitAction.FileReport,
            payload: somedata
        }
    }
    
    static CallLogout() {
        return {
            type: GitAction.Logout
        }
    }
}