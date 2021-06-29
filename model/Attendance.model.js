
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


AttendancesArray = new Schema({
    fullname: { type: String, required: true },
    userid: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false }
}, { timestamps: true });

let Attendance = new Schema({
    teacherid: { type: String, required: true },
    timeslot: { type: String, required: true },
    subject: { type: String, required: true },
    code: { type: String, required: true },
    isactive: { type: Boolean, required: true, default: true },
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    attendances: [AttendancesArray],
}, { timestamps: true });

// Export the model
module.exports = Attendance = mongoose.model(
    "attendance",
    Attendance
);
