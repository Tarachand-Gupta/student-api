
const router = require('express').Router();
let ConversationDictCollection = require('../model/ConversationDict.model');
let ConversationCollection = require('../model/Conversation.model');
let UserCollection = require('../model/user.model');


const ObjectId = require('mongodb').ObjectID;
const Functions = require('../functions/functions');
const { findAndUpdateConversationByUserId } = require('../functions/functions');

console.log("\nmessage.js called !!==>\n");


router.route('/getAllChatDetails').post((req, res) => {
    console.log('\ngetAllChatDetails request.body => ' + JSON.stringify(req.body));

    ConversationDictCollection.findOne({ userId: req.body.id })
        .then(chats => {
            res.json(chats);
            console.log('\n getAllChatDetails response.body => \n' + JSON.stringify(chats));
        })
        .catch(err => {
            console.log("\n catch in getAllChatDetails response.body => " + err);
            // res.send('error: ' + err)
        });

});



router.route('/getConversation').post((req, res) => {
    console.log('\n getConversation request.body => ' + req.body);

    o_id = new ObjectId(req.body.conversationId)
    ConversationCollection.findOne({ "_id": o_id })
        .then(messages => {

            res.json(messages.messages);
            console.log('\n getConversation response.body => \n' + messages.messages);
        })
        .catch(err => {
            console.log("\n catch in getConversation response.body => " + err);
            // res.send('error: ' + err)
        });

});
//main F to start new convo with 4 param
router.route('/addToConversationDict').post(async (req, res) => {

    //creating conversation nad getting _id
    const messages = []
    const Conversation = new ConversationCollection({
        messages
    });

    const conversation_id = await Conversation.save()
        .then((result) => {


            let conID = result._id
            let userId = req.body.userId;
            let participentAndIds = {
                withUser: req.body.withUser,
                conversationId: conID,
                username: req.body.withUsername
            };


            Functions.findAndUpdateConversationByUserId(userId, participentAndIds)
                .then(
                    result => {
                        userId = req.body.withUser
                        participentAndIds = {
                            withUser: req.body.userId,
                            conversationId: conID,
                            username: req.body.username
                        };
                        Functions.findAndUpdateConversationByUserId(userId, participentAndIds)
                            .then((result) => res.status(200).json(result))
                            .catch(err => res.status(400).json('Error: ' + err));

                    })
                .catch(err => res.status(400).json('Error: ' + err));




        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//temp F to start new convo with 3 param
router.route('/addToConversationDictTemp').post(async (req, res) => {

    const withUser = await Functions.getUserIdByFirstname(req.body.withUsername)

    //creating conversation and getting _id
    const messages = []
    const Conversation = new ConversationCollection({
        messages
    });
    const conversation_id = await Conversation.save()
        .then((result) => {


            let conID = result._id
            let userId = req.body.userId;
            let participentAndIds = {
                withUser: withUser,
                conversationId: conID,
                username: req.body.withUsername
            };


            Functions.findAndUpdateConversationByUserId(userId, participentAndIds)
                .then(
                    result => {
                        userId = withUser
                        participentAndIds = {
                            withUser: req.body.userId,
                            conversationId: conID,
                            username: req.body.username
                        };
                        Functions.findAndUpdateConversationByUserId(userId, participentAndIds)
                            .then((result) => res.status(200).json(result))
                            .catch(err => res.status(400).json('Error: ' + err));

                    })
                .catch(err => res.status(400).json('Error: ' + err));




        })
        .catch(err => res.status(400).json('Error: ' + err));
});



//=============> FUNCTIONS <===START=============//

// Go to ./functions/functions.js

//=============> FUNCTIONS <===END=============//






//=============> Devlpment Only <================//




router.route('/addConversation').post((req, res) => {
    const messages = []
    const Conversation = new ConversationCollection({
        messages
    });

    Conversation.save()
        .then((result) => res.status("200").json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;