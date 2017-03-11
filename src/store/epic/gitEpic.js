import { Observable } from 'rxjs';
import firebase from 'firebase';
import { ActionsObservable } from "redux-observable";

import { GitAction } from '../action/gitAction';
import { fbService } from '../service/fbService'

export class GitEpic {
    getAllComplains = (action$) =>
        action$.ofType(GitAction.GetComplain)
            .switchMap(({payload}) => {
                return firebase.database().ref('/complain/').once('value').then((snapshot) => {
                    return {
                        type: 'GOT-COMPLAIN',
                        payload: snapshot.val()
                    }
                })
            })
            
    getAllMissings = (action$) =>
        action$.ofType(GitAction.GetMissings)
            .switchMap(({payload}) => {
                return firebase.database().ref('/missing/').once('value').then((snapshot) => {
                    return {
                        type: 'GOT-MISSINGS',
                        payload: snapshot.val()
                    }
                })
            })

    getAllCrimes = (action$) =>
        action$.ofType(GitAction.GetCrimes)
            .switchMap(({payload}) => {
                return firebase.database().ref('/crime/').once('value').then((snapshot) => {
                    return {
                        type: 'GOT-CRIMES',
                        payload: snapshot.val()
                    }
                })
            })
            
    getUserData = (action$) =>
        action$.ofType(GitAction.GetData)
            .switchMap(({payload}) => {
                return firebase.database().ref('/posts/').once('value').then( (snapshot)=> {
                    console.log(action$)
                    return {
                        type: 'SUCCESS',
                        payload: snapshot.val()
                    }
                })
            })

    registerReport = (action$) =>
        action$.ofType(GitAction.FileReport)
            .switchMap(({payload}) => {
                var nodeToAddData = payload.value.toLowerCase();
                nodeToAddData = nodeToAddData.indexOf('missing')>-1?'missing': nodeToAddData;
                return firebase.database().ref(`${nodeToAddData}`).push(payload).then((userInfo)=> {
                    var storeNode = userInfo.path.o[1];
                    var payloadObj = {};
                    payloadObj[storeNode] = payload;
                    return {
                                type: 'FILED',
                                payload: payloadObj
                            }
                })
            })
    
    
    registerUser = (action$) =>
        action$.ofType(GitAction.Register)
            .switchMap(({payload}) => {
                return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((userInfo)=> {
                    delete payload.password;
                    payload.uid = userInfo.uid;
                   firebase.database().ref().child(`users/${userInfo.uid}`).set(payload)
                    return {
                                type: 'SUCCESSFULLY-CREATED-USER',
                                payload: payload
                            }
                })
            })
    LoginUser = (action$) =>
        action$.ofType(GitAction.Login)
            .switchMap(({payload}) => {
                return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((userInfo) => {
                    delete payload.password;
                    payload.uid = userInfo.uid;
                    return {
                        type: 'SUCCESSFULLY-LOGIN',
                        payload: payload
                    }
                })
            })
    LogoutUser = (action$) =>
        action$.ofType(GitAction.Logout)
            .switchMap(({payload}) => {
                return firebase.auth().signOut().then(() => {
                    return {
                        type: 'SUCCESSFULLY-LOGGED-OUT'
                    }
                })
            })
    getLoggedInUserData = (action$) =>
        action$.ofType('SUCCESSFULLY-LOGIN')
            .switchMap(({payload}) => {
                return firebase.database().ref('/').child(`users/${payload.uid}`).once('value').then((user) => {
                    return {
                        type: 'SUCCESSFULLY-LOGIN-WITH-DATA',
                        payload: user.val()
                    }
                })
            })


}
export let gitEpic = new GitEpic();

