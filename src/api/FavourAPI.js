import callAPI from "./utils/callAPI";

export const createFavour = data => callAPI("post", "/api/favour/create", data);

export const getFavours = data => callAPI("post", "/api/favour/get", data);

export const deleteOneFavour = data =>
  callAPI("post", "/api/favour/delete", data);

export const forgiveFavour = data =>
  callAPI("post", "/api/favour/forgive-debt", data);

export const getFavourTypes = () => callAPI("get", "/api/favour/get/favourType");
