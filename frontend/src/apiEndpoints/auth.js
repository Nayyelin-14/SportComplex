const { instance } = require("../axiosAPI/axios");

exports.registerNewUser = async (payload) => {
  try {
    const response = await instance.post("/register", payload, {
      validateStatus: () => true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

exports.LoginAccount = async (payload) => {
  try {
    const response = await instance.post("/login", payload, {
      validateStatus: () => true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
