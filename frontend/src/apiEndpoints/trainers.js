import { instance } from "../axiosAPI/axios";

export const trainer_details = async (trainer_ID) => {
  try {
    const response = await instance.get(`/trainer-details/${trainer_ID}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
