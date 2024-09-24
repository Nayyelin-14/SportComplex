import { instance } from "../axiosAPI/axios";

export const getAllUsers = async () => {
  try {
    const response = await instance.get("/admin/allusers", {
      validateStatus: () => true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getallBookings = async () => {
  try {
    const response = await instance.get("/admin/allbookings", {
      validateStatus: () => true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const restrict_user = async (userID) => {
  try {
    const response = await instance.post(`/admin/restrict-user/${userID}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const unrestrict_user = async (userID) => {
  try {
    const response = await instance.post(`/admin/unrestrict-user/${userID}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const delete_user = async (userID) => {
  try {
    const response = await instance.post(`/admin/delete-user/${userID}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
