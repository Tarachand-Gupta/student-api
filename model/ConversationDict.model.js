const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');



const Schema = mongoose.Schema;
participentAndIdsArray = new Schema({
  withUser: { type: String, required: true, unique: true },
  conversationId: { type: String, required: true },
  username: { type: String, required: true }
});
let ConversationDictSchema = new Schema({
  userId: { type: String, required: true },
  participentAndIds: [participentAndIdsArray],
});






ConversationDictSchema.plugin(uniqueValidator);
// Export the model
module.exports = ConversationDictSchema = mongoose.model(
  "conversationdict",
  ConversationDictSchema
);


