const mongoose = require("mongoose");
const Schema = mongoose.Schema;

NoticesArray = new Schema({
    notice_type: { type: String, required: true },
    data: { type: String, required: true },
}, { timestamps: true });

NoticeBoard = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    collegeid: { type: String, required: true },
    Notices: [NoticesArray]
}, { timestamps: true });

module.exports = NoticeBoard = mongoose.model("noticeboard", NoticeBoard);