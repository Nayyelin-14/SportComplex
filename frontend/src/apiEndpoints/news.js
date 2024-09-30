import { instance } from "../axiosAPI/axios";

export const getAllNews = async () => {
  try {
    const response = await instance.get("/allnews", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};