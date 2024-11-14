// components/TrainerDetail.js
import React from "react";

const TrainerDetail = ({ trainer }) => {
  if (!trainer) return <p>Loading trainer details...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      {/* Trainer Name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{trainer.name}</h2>

      {/* Specialization */}
      <p className="text-sm font-semibold text-blue-600 mb-2">
        Specialization: {trainer.specailization}
      </p>

      {/* Description */}
      <p className="text-gray-600 mb-4">{trainer.trainer_description}</p>

      {/* Qualification */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Qualification:</h3>
        <p className="text-gray-600">{trainer.qualification}</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Experience:</h3>
        <p className="text-gray-600">{trainer.experience}</p>
      </div>

      {/* Contact Information */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Contact Information:</h3>
        <p className="text-gray-600">
          <strong>Email:</strong> {trainer.email}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {trainer.phone}
        </p>
      </div>
    </div>
  );
};

export default TrainerDetail;
