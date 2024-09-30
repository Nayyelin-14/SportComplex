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
    const response = await instance.delete(`/admin/delete-user/${userID}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllNews = async () =>{
  try{
    const response = await instance.get("/admin/allnews", {
      validateStatus: ()=>true
    });
    return response.data;
  } catch(error){
    return error.message;
  }
}

export const addNews = async (newsData) => {
  try {
    const response = await instance.post("/admin/addnew", newsData);
    return response.data;
  } catch (error) {
    //  debugging
    console.error("API Error:", error);
    //  full error response
    return { isSuccess: false, message: error.response?.data?.message || error.message };
  }
};


export const removeNews = async (newsid) =>{
  try{
    const response = await instance.post(`/admin/removenew/${newsid}`);
    return response.data;
  }catch(error){
    return error.message;
  }
}

export const upload_img = async (formData) => {
  try{
    const response = await instance.post("/upload", formData);
    return response.data;
  }catch (error){
    return error.message;
  }
}