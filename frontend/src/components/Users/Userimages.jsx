import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
// import { FaTrashAlt } from "react-icons/fa"; // Import a trash icon from react-icons (or use any other icon library)

const Userimages = () => {
  const { user } = useSelector((state) => state.user);

  const handleDelete = (index) => {
    console.log(`Delete image at index: ${index}`);
    // Add your deletion logic here (e.g., update Redux store, send API request)
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

              {/* Delete Icon (Initially hidden, visible on hover) */}
              <button
                className="absolute bottom-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => handleDelete(index)}
              >
                <TrashIcon width={20} height={20} />
              </button>
            </div>
          ))
        ) : (
          <p>No images uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default Userimages;
