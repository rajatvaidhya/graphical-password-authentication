const jwt = require("jsonwebtoken");
const JWT_SEC = "A Holy River flowing in Taured just turned red.";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SEC);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ error: "Please authenticate using valid token." });
  }
};
module.exports = fetchuser;
