const trainers = require("../models/trainers");

exports.gettrainerDetails = async (req, res) => {
  const { trainer_ID } = req.params;
  console.log(trainer_ID);
  try {
    const detail_doc = await trainers
      .findById(trainer_ID)
      .select(
        "name trainer_description specailization qualification experience phone email"
      );
    if (!detail_doc) {
      throw new Error("Trainer not found");
    }
    return res.status(200).json({
      isSuccuess: true,
      detail_doc,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccuess: false,
      message: error.message,
    });
  }
};
