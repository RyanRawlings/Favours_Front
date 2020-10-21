import callAPI from "./utils/callAPI";

export const createFavour = (data) =>
  callAPI("post", "http://localhost:4000/api/favour/create", data);

export const getFavours = (data) =>
  callAPI("post", "http://localhost:4000/api/favour/get", data);

export const forgiveFavour = (data) =>
  callAPI("post", "http://localhost:4000/api/favour/forgive-debt", data);