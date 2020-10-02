import callAPI from "./utils/callAPI";
export const test = () => callAPI("get", "http://localhost:4000/api/get/count");
export const debitIOUList = () => callAPI("get", "http://localhost:4000/api/get/debit_list");
export const login = (data) => callAPI("post", "http://localhost:4000/api/user/login", data);
export const register = (data) => callAPI("post", "http://localhost:4000/api/user/register", data);
