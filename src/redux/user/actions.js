import axios from "axios";
import { LOGIN_API ,SIGNUP_API} from "../../config/api";

export const fetch_login_req = "fetch_login_req";
export const fetch_login_suc = "fetch_login_suc";
export const fetch_login_err = "fetch_login_err";
export const fetch_signup_req = "fetch_signup_req ";
export const fetch_signup_succ = "fetch_signup_succ";
export const fetch_signup_err = "fetch_signup_err";


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

export const fetchSignupReq = ()=>{
    return {
        type: fetch_signup_req

    }
    
}

export const fetchSignupSuc = (user)=>{
    return {
        type: fetch_signup_succ,
        payload:user

    }
}
export const fetchSignupErr = (errors)=>{
    return {
        type: fetch_signup_err,
        payload:errors

    }
   
}

export const callSignupApi = (name,email,pass,numb,navigate)=>{
    return (dispatch)=>{
        dispatch(fetchSignupReq());
        axios.post(SIGNUP_API , {
            name:name,
            email:email,
            password:pass,
            number:numb

        }).then((res)=>{

            if(res.data.code==1){
                dispatch(fetchSignupSuc(res.data.data))
                navigate("/dashboard")
            }else{
                dispatch(fetchSignupErr([res.data.msg]));
            }
        }).catch((e)=>{
            dispatch(fetchSignupErr(["Something went wrong. Try Later"]));
        
        })
    }

}