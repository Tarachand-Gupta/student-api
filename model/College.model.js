// "University_code": "DTE3460",
// "college_name": "Universal College of Engineering",
// "college_notification": [{
//     "noticeid": "DTE3460_notice1",
//     "notice_date": "2021-05-02",
//     "notice_type": "announcement",
//     "data": "this is test announcement data for college wall"
// }]
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let CollegeSchema = new Schema({

    collegecode: { type: String, required: true },
    collegename: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    postalcode: { type: String, required: true },
    universityaffiliated: { type: String, required: true },
    studentUserType: { type: String, required: true },

});


module.exports = College = mongoose.model("colleges", CollegeSchema);



