const jwt = require("jsonwebtoken");

const key =
  process.env.JWT_SECRET_KEY ||
  "tarachandtarachandtarachandtarachandtarachandtarachand";

class JWT {
  createToken = async (payload) => {
    return await jwt.sign(payload, key);
  };
}

// { _id: "5e3537a9b29cf92840171f3f" }

module.exports = new JWT();
