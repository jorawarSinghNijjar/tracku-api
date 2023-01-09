const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You are not logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You are not logged in" });
    }
     // console.log('payload', payload)
    const {userId} = payload;

    const user = await User.findById(userId);
    req.user = user;
    console.log(req.user)
    //All good go to next request, middleware has authenticated the request
    next();
  });
};
