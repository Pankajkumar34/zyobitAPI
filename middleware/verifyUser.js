
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  try {
      const token = req.headers['authorization'];
    const bearerToken = token && token.split(' ')[1];
    if (!bearerToken) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}


module.exports = verifyUser;