import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deletePhoto } from "../../apiEndpoints/auth";
import { message } from "antd";

const Userimages = () => {
  const ImagePerPage = 10; // Number of images to display per page
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isdeleting, setIsdeleting] = useState(false); // Delete state

  const { user } = useSelector((state) => state.user);

  // Calculate the index range for the current page
  const indexOfLastImage = currentPage * ImagePerPage;
  const indexOfFirstImage = indexOfLastImage - ImagePerPage;

  // Get the current images based on the current page
  const currentImages =
    user?.profileImage?.slice(indexOfFirstImage, indexOfLastImage) || [];

  // Handle page changes
  const totalPages = Math.ceil(
    (user?.profileImage?.length || 0) / ImagePerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deletephotos = async (image) => {
    try {
      setIsdeleting(true);
      message.warning("Deleting a photo, please wait...");

      const response = await deletePhoto({
        userID: user._id,
        deleteimgID: image, // Use the image URL directly
      });
      if (response.isSuccess) {
        message.success(response.message);
        // Update user profile image after deletion
        // Ideally, you should fetch the updated user data instead of reloading the window
        // Consider adding a mechanism to remove the image from the state
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
    <div className="h-[650px] flex flex-col gap-32 justify-between">
      <div>
        {" "}
        <p className="mb-8">Uploaded images</p>
        <div className="flex flex-row gap-6 flex-wrap ">
          {currentImages.length > 0 ? (
            currentImages.map((image, index) => (
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
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-red-900 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 border rounded-lg ${
              currentPage === index + 1 ? "bg-red-900 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === totalPages ? "bg-gray-300" : "bg-red-900 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Userimages;
