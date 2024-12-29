const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.send("something gone wrong");
  }

  try {
    const token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = token;
    next();
  } catch (err) {
    res.send("token is not valid");
  }
};
