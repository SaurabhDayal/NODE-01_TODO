const jwt = require("jsonwebtoken");
const { secretKey } = require("../controllers/usersAPIs");

const authentication = async (req, res, next) => {
  const token = req.header("token");
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
      error: "token error",
    });
  }

  try {
    const tokenPart = token.split(" ")[1];
    if (tokenPart) {
      const decodes = jwt.verify(tokenPart, secretKey);
      req.user_id = decodes["id"];
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
        error: "token error",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = { authentication };
