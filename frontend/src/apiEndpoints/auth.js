import { instance } from "../axiosAPI/axios";

export const registerNewUser = async (payload) => {
  try {
    const response = await instance.post("/register", payload, {
      validateStatus: () => true,
    });

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

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateInfo = async (formData) => {
  // console.log(payload);
  try {
    const response = await instance.post("/updateInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      validateStatus: () => true,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getBookingHistory = async (userID) => {
  try {
    const response = await instance.get(`/user-profile/${userID}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
// router.delete(
//   "/user-profile/:user_ID/:deleteImageID",
//   authMiddleware,
//   UserController.deletePhotos
// );
// export const deletePhoto = async (payload) => {
//   // console.log(payload);
//   try {
//     const { deleteimgID, userID } = payload;
//     console.log(deleteimgID, userID);
//     const encodedImgUrl = encodeURIComponent(deleteimgID);
//     // console.log(encodedImgUrl);
//     // console.log(userID);
//     const response = await instance.delete(
//       `/user-profile/${userID}/${deleteimgID}`,
//       {
//         validateStatus: function (status) {
//           return status >= 200 && status < 300; // Only resolve if the status code is in the range 2xx
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };
export const deletePhoto = async (payload) => {
  try {
    const { deleteimgID, userID } = payload;
    console.log(deleteimgID, userID);
    const encodedImgUrl = encodeURIComponent(deleteimgID);
    console.log(encodedImgUrl);
    const response = await instance.delete(`/user-profile/${userID}`, {
      data: { deleteimgID },
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message }; // Ensure error structure matches the response
  }
};

export const PasswordChange = async (payload) => {
  const { userid } = payload;
  console.log(payload.userid);
  try {
    const response = await instance.post(
      `/user-profile/${userid}/changepassword`,
      payload,
      { validateStatus: () => true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
