import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { trainer_details } from "../../apiEndpoints/trainers";
import TrainerDetail from "../../components/sportBooking/TrainerDetail";

const Trainers = ({ trainerdetail }) => {
  const { _id } = trainerdetail;
  // console.log(trainer_ID);
  const [trainer, setTrainer] = useState(null); // initialize trainer state to null

  // Define fetchDetails to fetch trainer details
  const fetchDetails = async () => {
    try {
      // Pass the trainer_ID to the backend function to get the specific trainer's details
      const response = await trainer_details(_id);

      setTrainer(response.detail_doc); // Set the fetched trainer details in state
    } catch (error) {
      console.error("Failed to fetch trainer details:", error); // log any errors
    }
  };

  // Use useEffect to call fetchDetails when the component mounts or trainer_ID changes
  useEffect(() => {
    if (_id) {
      fetchDetails();
    }
  }, [_id]);

  return (
    <div className="max-w-6xl mx-auto p-2">
      {trainer ? (
        <TrainerDetail trainer={trainer} />
      ) : (
        <p>Loading trainer details...</p> //
      )}
    </div>
  );
};

export default Trainers;
