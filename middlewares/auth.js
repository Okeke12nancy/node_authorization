const jwt = require("jsonwebtoken");

// Here, Authentication happens!!!!!!!!
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(res.status(401).send("Not authorized to access this route"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (err) {
    return next(res.status(401).send("Not authorized to access this route"));
  }
};

// Here, Authorization Here!!!!!
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({
        success: false,
        message: `User role:${req.user.role} is not authorized to access this route`,
      });

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
