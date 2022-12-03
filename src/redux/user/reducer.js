import {
    fetch_login_err ,fetch_login_suc,fetch_login_req,
    fetch_signup_req,fetch_signup_succ,fetch_signup_err
} from "./actions";

const initialState = {
    loggedIn:false,
    errors:[],
    loading:false,
    userObj: null
}

const reducer = (state=initialState , action)=>{
    switch(action.type){
        case fetch_login_req: return {
            ...state,
            loading:true,
            errors:[]
        }
        case fetch_login_suc : return{
            ...state,
            loading:false,
            loggedIn:true,
            userObj: action.payload,
            errors:[]
        }
        case fetch_login_err :return {
            ...state,
            loading:false,
            loggedIn:false,
            errors:[...action.payload],
            userObj: null
        }

        case fetch_signup_req: return {
            ...state,
            loading:true,
            errors:[]
        }
        case fetch_signup_succ : return{
            ...state,
            loading:false,
            loggedIn:true,
            userObj: action.payload,
            errors:[]
        }
        case fetch_signup_err :return {
            ...state,
            loading:false,
            loggedIn:false,
            errors:[...action.payload],
            userObj: null
        }
        default : return state
    }

}
export default reducer;