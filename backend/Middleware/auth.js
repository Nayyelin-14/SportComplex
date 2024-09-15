const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // console.log("req", req);
  try {
    const bearerToken = req.headers["authorization"];

    const JWT_token = bearerToken.split(" ")[1]; // Get the actual token
    // console.log("Bearer token:", token);
    if (!JWT_token) {
      throw new Error("Unauthorized Login");
    }

    // Process token (e.g., verify it)

    const LoginToken = jwt.verify(JWT_token, process.env.JWT_KEY);

    if (!LoginToken) {
      throw new Error("Unauthorized Login");
    }
    req.USER_ID = LoginToken.userID;
    //req htl ko jwt asign loke tone ka ya lr dk userID ko htae pyy
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
