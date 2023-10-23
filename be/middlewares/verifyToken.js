const jwt = require("jsonwebtoken");

// create a middleware to verify token

module.exports = (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) {
    return response.status(401).send({
      errorType: "TokenError",
      statusCode: 401,
      message: "Access denied, invalid token",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    request.author = verified;
    next();
  } catch (error) {
    response.status(403).send({
      statusCode: 403,
      message: "Invalid token or expired",
    });
  }
};
