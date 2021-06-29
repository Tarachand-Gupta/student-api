
const router = require('express').Router();
let ConversationDictCollection = require('../model/ConversationDict.model');
let AttendanceCollection = require('../model/Attendance.model');
let UserCollection = require('../model/user.model');
let TeacherCollection = require('../model/Teacher.model')



router.route('/addTeacher').post((req, res) => {

    const Teacher = new TeacherCollection({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        userprofile: req.body.userprofile,
        qualification: req.body.qualification,
        specialized: req.body.specialized,
        college: req.body.college,
        collegecode: req.body.collegecode,
        positiontype: req.body.positiontype,
        studentUserType: "Teacher"
    });

    Teacher.save()
        .then((result) => res.status("200").json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/takeAttendance').post((req, res) => {
    console.log('\n takeAttendance request.body => ' + JSON.stringify(req.body));
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const Attendance = new AttendanceCollection({
        teacherid: req.body.teacherid,
        timeslot: req.body.timeslot,
        subject: req.body.subject,
        code: req.body.code,
        isactive: true,
        day: day,
        month: month,
        year: year,
        attendances: [],
    });

    Attendance.save()
        .then((result) => {
            res.json(result)
            console.log('\n takeAttendance response.body => ' + JSON.stringify(result));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getAttendanceResponses').post((req, res) => {
    console.log('\n getAttendanceResponses request.body => ' + JSON.stringify(req.body));
    const teacherid = req.body.teacherid
    const code = req.body.code

    AttendanceCollection.findOne({
        teacherid: teacherid,
        code: code
    }).then(result => {
        res.json(result);
        console.log('\n getAttendanceResponses response.body => \n' + JSON.stringify(result));
    })
        .catch(err => {
            console.log("\n catch in getAttendanceResponses response.body => " + err);
            // res.send('error: ' + err)
        });
});

router.route('/viewAttendanceResponses').post((req, res) => {
    console.log('\n viewAttendanceResponses request.body => ' + JSON.stringify(req.body));
    const teacherid = req.body.teacherid
    const day = req.body.day
    const month = req.body.month
    const year = req.body.year

    AttendanceCollection.find({
        teacherid: teacherid,
        day: day,
        month: month,
        year: year
    }).then(result => {
        if (!result.length) {
            res.json({ "failed": true });
        }
        else {
            res.json(result);
        }

        console.log('\n viewAttendanceResponses response.body => \n' + JSON.stringify(result));
    })
        .catch(err => {
            console.log("\n catch in viewAttendanceResponses response.body => " + err);
            // res.send('error: ' + err)
        });
});


// Not Implemented yet // isConfirmed for Selected students
router.route('/confirmAttendance').post((req, res) => {
    console.log('\n confirmAttendance request.body => ' + JSON.stringify(req.body));

    const teacherid = req.body.teacherid
    const code = req.body.code
    const array = ["5e3536e1b29cf92840171f3e", "5e3537a9b29cf92840171f3f"]



    AttendanceCollection.findOneAndUpdate({
        teacherid: teacherid,
        code: code

    }, {
        $push: {
            attendances: {
                $each: [{ userid: "5e3536e1b29cf92840171f3e", isConfirmed: true }],
            }
        }
    }, {
        upsert: false,
        new: true
    })
        .then(result => {

            res.json(result);
            console.log('\n confirmAttendance response.body => \n' + JSON.stringify(result));
        })
        .catch(err => {
            console.log("\n catch in confirmAttendance response.body => " + err);
            // res.send('error: ' + err)
        });
});


router.route('/submitAttendance').post((req, res) => {
    console.log('\n submitAttendance request.body => ' + JSON.stringify(req.body));

    const teacherid = req.body.teacherid
    const code = req.body.code

    AttendanceCollection.findOneAndUpdate({
        teacherid: teacherid,
        code: code,
        isactive: true
    }, {
        isactive: false
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

            console.log('\n submitAttendance response.body => \n' + JSON.stringify(result));
        })
        .catch(err => {
            res.json({ "status": err });
            console.log("\n catch in submitAttendance response.body => " + err);
            // res.send('error: ' + err)
        });
});



module.exports = router;