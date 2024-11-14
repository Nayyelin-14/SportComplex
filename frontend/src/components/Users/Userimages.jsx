import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePhoto } from "../../apiEndpoints/auth";
import { message } from "antd";
import { setImages } from "../../store/userSlice";

const Userimages = ({ setActiveTabKey }) => {
  const [imagePerPage, setImagePerPage] = useState(10);
  // const ImagePerPage = 10; // Number of images to display per page
  // Function to determine photos per page based on screen size
  const updatePhotosPerPage = () => {
    const width = window.innerWidth;
    if (width <= 568) {
      // Small screen (mobile)
      setImagePerPage(4);
    } else if (width <= 768) {
      // Medium screen (tablet)
      setImagePerPage(6);
    } else if (width <= 1024) {
      // Medium screen (tablet)
      setImagePerPage(8);
    } else {
      // Large screen (desktop)
      setImagePerPage(10);
    }
  };

  // Update the photosPerPage whenever the window is resized
  useEffect(() => {
    updatePhotosPerPage(); // Set initial photos per page based on screen size
    window.addEventListener("resize", updatePhotosPerPage); // Add resize event listener

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updatePhotosPerPage);
    };
  }, []);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isdeleting, setIsdeleting] = useState(false); // Delete state
  const { user } = useSelector((state) => state.user);
  const userImages = user?.profileImage || [];
  const dispatch = useDispatch();

  // Calculate the index range for the current page
  const indexOfLastImage = currentPage * imagePerPage;
  const indexOfFirstImage = indexOfLastImage - imagePerPage;

  // Get the current images based on the current page
  const currentImages = userImages.slice(indexOfFirstImage, indexOfLastImage);

  // Handle page changes
  const totalPages = Math.ceil(userImages.length / imagePerPage);
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
        window.location.reload();
        // Dispatch the updated image list to Redux store
        dispatch(setImages(response.update_userIMG.profileImage));

        setActiveTabKey("1");
        // You can also set the userImages state directly here, but it's already handled by Redux.
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
    <div className="h-[450px] lg:h-[550px] flex flex-col lg:gap-32 justify-between">
      <div>
        <p className="mb-8">Uploaded images</p>
        <div className="flex flex-row  gap-10  sm:gap-4 md:gap-2 lg:gap-10 flex-wrap p-2">
          {currentImages.length > 0 ? (
            currentImages.map((image, index) => (
              <div
                key={index}
                className="relative flex flex-row group 
            w-[100px] h-[100px] sm:w-[114px] sm:h-[110px] md:w-[134px] md:h-[135px] "
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
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-full overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-lg ${
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
              className={`px-3 py-1 border rounded-lg ${
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
            className={`px-3 py-1 border rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-red-900 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userimages;
