import { instance } from "../axiosAPI/axios";

export const getAllUsers = async () => {
  try {
    const response = await instance.get("/admin/allusers", {
      validateStatus: () => true,
    });
    console.log(response);
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
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
