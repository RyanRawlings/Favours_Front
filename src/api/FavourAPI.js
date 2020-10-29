import callAPI from "./utils/callAPI";

export const createFavour = data =>
  callAPI("post", "http://localhost:4000/api/favour/create", data);

export const getFavours = data =>
  callAPI("post", "http://localhost:4000/api/favour/get", data);
export const deleteOneFavour = data =>
  callAPI("post", "http://localhost:4000/api/favour/delete", data);

export const forgiveFavour = data =>
  callAPI("post", "http://localhost:4000/api/favour/forgive-debt", data);

export const getFavourTypes = () =>
  callAPI("get", "http://localhost:4000/api/get/get-favourType");
