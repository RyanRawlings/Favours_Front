import callAPI from "./utils/callAPI";

export const login = data =>
  callAPI("post", "http://localhost:4000/api/user/login", data);
export const register = data =>
  callAPI("post", "http://localhost:4000/api/user/register", data);
export const getUserDetails = () =>
  callAPI("get", "http://localhost:4000/api/user/profile");
export const getUsers = () =>
  callAPI("get", "http://localhost:4000/api/user/get");
export const getUserGroups = (data) => 
  callAPI("post", "http://localhost:4000/api/user/groups", data);
export const getGroupUserEmails = (data) => 
  callAPI("post", "http://localhost:4000/api/user/group-users", data);  

export const getUser = (data) => 
  callAPI("post", "http://localhost:4000/api/user/get-one", data);  

  
