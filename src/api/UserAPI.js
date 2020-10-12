import callAPI from "./utils/callAPI";

// export const login = data =>
//   callAPI("post", "http://localhost:4000/api/user/login", data);
export const register = data =>
  callAPI("post", "http://localhost:4000/api/user/register", data);
export const getUserDetails = () =>
  callAPI("get", "http://localhost:4000/api/user/profile");
