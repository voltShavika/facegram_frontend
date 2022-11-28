import axios from "axios";
import { LOGIN_API } from "../../config/api";

export const fetch_login_req = "fetch_login_req";
export const fetch_login_suc = "fetch_login_suc";
export const fetch_login_err = "fetch_login_err";

export const fetchLoginReq = ()=>{
    return {
        type: fetch_login_req
    }
}

export const fetchLoginSuc = (userObj)=>{
    return {
        type: fetch_login_suc,
        payload: userObj
    }
}

export const fetchLoginErr = (errors)=>{
    return {
        type: fetch_login_err,
        payload: errors
    }
}
export const callLoginApi = (iname, ipass, navigate)=>{
    return (dispatch)=> {
        dispatch(fetchLoginReq());
        axios.post(LOGIN_API, {
            email: iname,
            password: ipass
          }).then(res => {
            if(res.data.code == 1){
              dispatch(fetchLoginSuc(res.data.data));
              navigate("/dashboard")
            }
            else{
              dispatch(fetchLoginErr([res.data.msg]));
            }
          }).catch(e => {
            dispatch(fetchLoginErr(["Something went wrong try Later"]));
          })

    }
}
