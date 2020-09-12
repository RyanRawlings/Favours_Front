import callAPI from "./utils/callAPI";
export const test = () => callAPI("get", "/api/count");
