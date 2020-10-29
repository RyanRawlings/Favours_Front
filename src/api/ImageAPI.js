import callAPI from "./utils/callAPI";

export const storeImageData = data =>
  callAPI("post", "/api/image/update/mongo", data);

export const storeProfileImageData = data =>
  callAPI("post", "/api/user/upload-profile-image", data);
