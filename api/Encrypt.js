const crypto = require("crypto");

module.exports = class Encrypt {
  static encrypt(password) {
    return crypto
      .createHmac("sha256", "Attack of the Clones")
      .update(password)
      .digest("hex");
  }
};
