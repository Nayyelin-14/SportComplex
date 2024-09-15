const authMiddleware = async (req, res, next) => {
  // console.log("req", req);
  const bearerToken = req.headers["authorization"];
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    const token = bearerToken.split(" ")[1]; // Get the actual token
    console.log("Bearer token:", token);
    // Process token (e.g., verify it)
    next(); // Don't forget to call next() to pass control to the next middleware
  } else {
    return res.status(403).json({ message: "No token provided" });
  }
};

module.exports = authMiddleware;
