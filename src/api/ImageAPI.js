import callAPI from "./utils/callAPI";
import axios from "axios";

export const storeImageData = data =>
  axios.post("http://localhost:4000/api/image/update/mongo", data);