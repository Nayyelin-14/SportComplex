import { instance } from "../axiosAPI/axios";

export const getAllUsers = async () => {
  try {
    const response = await instance.get("/admin/allusers", {
      validateStatus: () => true,
    });

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

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const restrict_user = async (userID) => {
  try {
    const response = await instance.post(`/admin/restrict-user/${userID}`);

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
    const response = await instance.delete(`/admin/delete-user/${userID}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllNews = async () => {
  try {
    const response = await instance.get("/admin/allnews", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const addNews = async (formData) => {
  try {
    const response = await instance.post("/admin/addnew", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return {
      isSuccess: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const removeNews = async (newsid) => {
  try {
    const response = await instance.post(`/admin/removenew/${newsid}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const upload_img = async (formData) => {
  try {
    const response = await instance.post("/admin/upload", formData);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const delete_booking = async (booking_id) => {
  try {
    const response = await instance.post(`/admin/deletebooking/${booking_id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
