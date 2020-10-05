import callAPI from "./utils/callAPI";
export const test = () => callAPI("get", "http://localhost:4000/api/get/count");
export const debitIOUList = () => callAPI("get", "http://localhost:4000/api/get/debit_list");
export const login = (data) => callAPI("post", "http://localhost:4000/api/user/login", data);
export const register = (data) => callAPI("post", "http://localhost:4000/api/user/register", data);
export const uploadImage = (data) => callAPI("post", "http://localhost:4000/api/file/image-upload", data);
export const updateImageKey = (data) => callAPI("post", "http://localhost:4000/api/file/image-update-key", data);
export const getImageFromS3 = (data) => callAPI("post", "http://localhost:4000/api/get/get-s3-image", data);
export const deleteImageFromS3 = (data) => callAPI("get", "http://localhost:4000/api/file/delete-s3-image", data);