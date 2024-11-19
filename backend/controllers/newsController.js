const News = require("../models/newsModel"); // Adjust the path as necessary

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().select(
      "title profileImage detail featuredline"
    ); // Fetch all news from the database
    console.log(news);
    return res.status(200).json({
      isSuccess: true,
      message: "Fetched all news",
      news: news,
    });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: error.message });
  }
};

// Add New
// exports.addNew = async (req, res) => {
//   try {
//     let news = await News.find({});
//     let id;

//     const { title, image, detail, featuredline } = req.body;

//     if (news.length > 0) {
//       const lastnew = news.slice(-1)[0];
//       id = lastnew.id + 1;
//     } else {
//       id = 1;
//     }

//     const addnew = new News({
//       id: id,
//       title,
//       image,
//       detail,
//       featuredline,
//     });

//     await addnew.save();
//     res.json({
//       success: true,
//       message: "New added successfully",
//       title: req.body.title,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.removeNew = async (req, res) => {
//   try {
//     //const {id} = req.params <--- htin tl
//     const newToDelete = await News.findOne({ id: req.body.id });

//     if (!newToDelete) {
//       return res
//         .status(404)
//         .json({ success: false, message: "News not found" });
//     }

//     const imageUrl = newToDelete.image; // Full URL
//     const imageName = path.basename(imageUrl);

//     const imagePath = path.join(__dirname, "../upload/images", imageName);
//     console.log("Image Path:", imagePath);

//     // Delete the associated image file if it exists
//     if (fs.existsSync(imagePath)) {
//       try {
//         fs.unlinkSync(imagePath);
//         console.log(`Image ${imageName} deleted successfully.`);
//       } catch (err) {
//         console.error("Error deleting image:", err);
//       }
//     } else {
//       console.log(`Image file not found: ${imagePath}`);
//     }

//     await News.findOneAndDelete({ id: req.body.id });

//     res.json({
//       success: true,
//       message: "News and associated image deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
