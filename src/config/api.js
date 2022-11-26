const prod = false;
var prex;
if(prod){
    prex = "https://facegaram.herokuapp.com"
}
else{
    prex = "http://localhost"
} 

export const LOGIN_API = prex + '/api/login'
export const SIGNUP_API = prex + '/api/signup'
export const POSTS_API = prex + '/api/posts'
