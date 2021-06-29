
const router = require('express').Router();
let ConversationDictCollection = require('../model/ConversationDict.model');
let ConversationCollection = require('../model/Conversation.model');
let UserCollection = require('../model/user.model');
let CollegeCollection = require('../model/College.model');
let NoticeboardCollection = require('../model/NoticeBoard.model');



router.route('/addCollege').post((req, res) => {

    const College = new CollegeCollection({
        collegecode: req.body.collegecode,
        collegename: req.body.collegename,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        district: req.body.district,
        postalcode: req.body.postalcode,
        universityaffiliated: req.body.universityaffiliated,
        studentUserType: "college"
    });

    College.save()
        .then((result) => res.status("200").json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/createNotice').post((req, res) => {
    console.log('\n createNotice request.body => ' + JSON.stringify(req.body));
    const collegeid = req.body.collegeid
    const Notices = {
        notice_type: req.body.type,
        data: req.body.data
    }

    NoticeboardCollection.findOneAndUpdate({
        collegeid: collegeid
    }, {
        $push: {
            Notices: Notices
        }
    }, {
        upsert: true, new: true
    })
        .then(result => {
            res.json(result);
            console.log('\n createNotice response.body => \n' + JSON.stringify(result));
        })
        .catch(err => {
            console.log("\n catch in createNotice response.body => " + err);
            // res.send('error: ' + err)
        });

});




module.exports = router;