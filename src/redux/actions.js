export const login_req = "login_req";
export const logout_req = "logout_req";
export const create_post = "create_post";

export const fetchLogin = (email) => {
    return {
        type: login_req,
        payload: email
    }
}

export const fetchLogout = () => {
    return {
        type: logout_req
    }
}

export const fetchCreatePost = (item)=>{
    return {
        type:create_post,
        payload:item
    }
}