const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,
  location: String,
  profilePic: String // URL or base64
});

module.exports = mongoose.model('Profile', profileSchema);
