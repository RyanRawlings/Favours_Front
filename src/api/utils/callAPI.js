const axios = require("axios");

const callAPI = (method, url, data = {}, params = {}) =>
  axios({ method, url, data, params }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.log("in front end callAPI, response error : ", response.response);
      throw response.response;
    }
  });

export default callAPI;