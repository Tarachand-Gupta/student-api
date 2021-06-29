const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  userprofile: { type: String, required: true },
  gender: { type: String, required: true },
  mobileno: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  qualification: { type: String, required: true },
  stream: { type: String, required: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  areaofintrest: { type: String, required: true },
  passwordKey: { type: Buffer, required: true },
  online: { type: String },
  socketId: { type: String },
  createdOn: { type: Date, default: Date.now },
  messageId: { type: String, required: true },
  scope: [{}]
});

// Export the model
module.exports = User = mongoose.model("users", UserSchema);
