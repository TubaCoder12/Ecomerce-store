import jwt from "jsonwebtoken";

export const RequiredLoggedIn = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    let token = req.cookies?.resetToken;

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // reset token ke liye RESET_SECRET
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in middleware:", error.message);
    res.status(401).json({ error: "Token is expired or invalid" });
  }
};


export const Authenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer token
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user ID for later use
    req.user = { _id: decoded.id }; // decoded.id depends on token payload
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ error: "Token expired or invalid" });
  }
};




