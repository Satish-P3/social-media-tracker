// const mongoose = require('mongoose');

// const TrackingSchema = new mongoose.Schema({
//     platform:{
//         type : String,
//         required : true,
//     },
//     timeSpent:{
//         type : Number,
//         required : true,
//     },
//     date:{
//         type : Date,
//         default : Date.now,
//     },
// });
// module.exports = mongoose.model('Tracking',TrackingSchema);
const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tracking', TrackingSchema);
