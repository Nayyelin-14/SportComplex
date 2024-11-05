import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deletePhoto } from "../../apiEndpoints/auth";
import { message } from "antd";

const Userimages = () => {
  const { user } = useSelector((state) => state.user);
  const [isdeleting, setIsdeleting] = useState(false);
  const deletephotos = async (image) => {
    try {
      setIsdeleting(true);

      message.warning("Deleteing a photo , please wait");

      const response = await deletePhoto({
        userID: user._id,
        deleteimgID: image, // Use the image URL directly
      });
      if (response.isSuccess) {
        window.location.reload();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsdeleting(false); // Always reset isdeleting state
    }
  };

  return (
    <div>
      <p className="mb-8">Uploaded images</p>
      <div className="flex flex-row gap-6 flex-wrap">
        {user?.profileImage?.length > 0 ? (
          user.profileImage.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-row group w-[154px] h-[150px]"
            >
              {/* Image */}
              <img
                src={image}
                alt={`Uploaded image ${index}`}
                className="w-full h-full object-cover rounded-lg border-2 border-black"
              />
              {/* Delete Icon */}
              <button
                disabled={isdeleting}
                className="absolute bottom-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => deletephotos(image)} // Call with the image URL
              >
                <TrashIcon width={20} height={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex justify-center w-full">
            <p className="text-center font-bold text-red-900 text-2xl">
              You haven't uploaded any photos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userimages;
