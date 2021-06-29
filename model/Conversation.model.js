const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// let chatsSchemaArray = new Schema({
//   participentMsgid: { type: String, required: true },
//   conversationId: [{ type: String, required: false }],
//   conversationDate: { type: String, required: false },
// });

// let usersSchemaArray = new Schema({
//   userMsgId: { type: String, required: true },
//   isOnline: { type: Boolean, default: false },
//   chats: [chatsSchemaArray],
// });
let MessagesSchemaArray = new Schema({
  fromParticipentId: { type: String, required: true },
  toParticipentId: { type: String, required: false },
  isDeletedFor: [{ type: String, required: false }],
  isSeen: { type: Boolean, required: true, default: false },
  isMediaMessage: { type: Boolean, required: false },
  mediaLink: { type: String, required: false },
  mediaTag: [{ type: String, required: false }],
  mediaScopeLevel: { type: String, required: false, default: "0" },
  messageText: { type: String, required: true },
  messageDate: { type: String, required: false },
}, { timestamps: true });



let ConversationSchema = new Schema({

  messages: [MessagesSchemaArray],
});

// Export the model
module.exports = ConversationSchema = mongoose.model(
  "conversations",
  ConversationSchema
);

