const prod = true;
var prex;
if(prod){
    prex = "https://facegrambackend.onrender.com"
}
else{
    prex = "http://localhost"
} 

export const LOGIN_API = prex + '/api/login'
export const SIGNUP_API = prex + '/api/signup'
export const POSTS_API = prex + '/api/posts'
export const Create_post_API = prex+ '/api/post'
export const LIKE_API = prex + '/api/like/'
export const COMMENT_API = prex + '/api/comment/' 
