const router = require('express').Router();
let UserCollection = require('../model/user.model');
let AttendanceCollection = require('../model/Attendance.model');
let CollegeCollection = require('../model/College.model');
let NoticeboardCollection = require('../model/NoticeBoard.model');
const { request } = require('../server');


router.route('/getAllNotices').post((req, res) => {
    console.log('\n getAllNotices request.body => ' + JSON.stringify(req.body));

    NoticeboardCollection.findOne({
        collegeid: req.body.collegeid
    }).then(result => {
        res.json(result);
        console.log('\n getAllNotices response.body => \n' + JSON.stringify(result));
    })
        .catch(err => {
            console.log("\n catch in getAllNotices response.body => " + err);
            // res.send('error: ' + err)
        });

});

// router.route('/createNotice').post((req, res) => {
//     console.log('\n createNotice request.body => ' + JSON.stringify(req.body));
//     const collegeid = req.body.collegeid
//     const Notices = {
//         notice_type: req.body.type,
//         data: req.body.data
//     }

//     NoticeboardCollection.findOneAndUpdate({
//         collegeid: collegeid
//     }, {
//         $push: {
//             Notices: Notices
//         }
//     }, {
//         upsert: true, new: true
//     })
//         .then(result => {
//             res.json(result);
//             console.log('\n createNotice response.body => \n' + JSON.stringify(result));
//         })
//         .catch(err => {
//             console.log("\n catch in createNotice response.body => " + err);
//             // res.send('error: ' + err)
//         });

// });

router.route('/giveAttendance').post((req, res) => {
    console.log('\n giveAttendance request.body => ' + JSON.stringify(req.body));
    const attendance = {
        fullname: req.body.fullname,
        userid: req.body.userid
    }

    const code = req.body.code

    AttendanceCollection.findOneAndUpdate({
        isactive: true,
        code: code
    }, {
        $push: {
            attendances: attendance
        }
    }, {
        upsert: false,
        new: true
    })
        .then(result => {
            if (!result) {
                res.json({ "failed": true });
            }
            else {
                res.json({ "failed": false });
            }
            console.log('\n giveAttendance response.body => \n' + JSON.stringify(result));
        })
        .catch(err => {
            console.log("\n catch in giveAttendance response.body => " + err);
            // res.send('error: ' + err)
        });

});

















module.exports = router;
