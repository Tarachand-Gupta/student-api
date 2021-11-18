let ConversationDictCollection = require("../model/ConversationDict.model");
let ConversationCollection = require("../model/Conversation.model");
let UserCollection = require("../model/user.model");
// const { response } = require('../server');

class Functions {
  saveSocketToUser = async (UserId, socketId) => {
    await UserCollection.findOneAndUpdate(
      { _id: UserId },
      { socketId: socketId },
      { new: true }
    )
      .then((response) => {
        console.log("user => ", UserId, " SocketId => ", response.socketId);
      })
      .catch((err) => {
        console.log("\n catch in saveSocketToUser response.body err => " + err);
        // res.send('error: ' + err)
      });
  };

  saveMessage = async (message) => {
    console.log("\n saveMessage param => " + JSON.stringify(message));
    const conversationId = message.conversationId;
    return await ConversationCollection.findOneAndUpdate(
      {
        _id: conversationId,
      },
      {
        $push: {
          messages: message,
        },
      },
      { new: true }
    )
      .then((response) => {
        console.log(
          "\n message saved to DB ,response => ",
          JSON.stringify("Message saved to DB !!!")
        );
        return true;
      })
      .catch((err) => {
        console.log("\n catch in saveMessage response.body err => " + err);
        // res.send('error: ' + err)
      });
  };

  getSocketIdByUserId = async (Id) => {
    console.log("\n getSocketIdByUserId UserId => " + JSON.stringify(Id));
    // const Id = message.toParticipentId

    return await UserCollection.findOne({ _id: Id })
      .then((response) => {
        console.log("\n getSocketIdByUserId response => ", response.socketId);
        return response.socketId;
      })
      .catch((err) => {
        console.log(
          "\n catch in getSocketIdByUserId response.body err => " + err
        );
        // res.send('error: ' + err)
      });
  };

  getUserIdByFirstname = async (firstname) => {
    console.log(
      "\n getUserIdByFirstname firstname => " + JSON.stringify(firstname)
    );
    // const Id = message.toParticipentId

    return await UserCollection.findOne({ firstname: firstname })
      .then((response) => {
        console.log("\n getUserIdByFirstname response => ", response._id);
        return response._id;
      })
      .catch((err) => {
        console.log(
          "\n catch in getUserIdByFirstname response.body err => " + err
        );
        // res.send('error: ' + err)
      });
  };

  findAndUpdateConversationByUserId = async (userId, participentAndIds) => {
    return await ConversationDictCollection.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $push: {
          participentAndIds: participentAndIds,
        },
      },
      {
        upsert: true,
      }
    );
  };
}
module.exports = new Functions();
