import Cookie from "js-cookie";

const setToken = (token) =>{
    Cookie.set('token', token);
};

const getToken = () =>{
    return Cookie.get('token');
};

const removeToken = () =>{
    Cookie.remove('token');
};

export {setToken,getToken,removeToken}