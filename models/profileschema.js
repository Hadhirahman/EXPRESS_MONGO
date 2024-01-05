const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
    ref: 'User',
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
