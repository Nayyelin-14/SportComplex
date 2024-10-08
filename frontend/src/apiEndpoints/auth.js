import { instance } from "../axiosAPI/axios";

export const registerNewUser = async (payload) => {
  try {
    const response = await instance.post("/register", payload, {
      validateStatus: () => true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const loginaccount = async (payload) => {
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

export const getCurrentUser = async () => {
  try {
    const response = await instance.get("/get-current-user", {
      validateStatus: () => true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateInfo = async (payload) => {
  try {
    const response = await instance.post("/updateInfo", payload, {
      validateStatus: () => true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
