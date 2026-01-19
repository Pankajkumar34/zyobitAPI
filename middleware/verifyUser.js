
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}


module.exports = verifyUser;