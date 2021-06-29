const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let TeacherSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },

    userprofile: { type: String, required: false },
    qualification: { type: String, required: true },
    specialized: { type: String, required: true },
    college: { type: String, required: true },
    collegecode: { type: String, required: true },
    positiontype: { type: String, required: true },
    studentUserType: { type: String, required: true },

});


module.exports = Teacher = mongoose.model("teachers", TeacherSchema);
