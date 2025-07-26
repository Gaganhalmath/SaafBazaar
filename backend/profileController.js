const Profile = require('./profileModel');

// Create or update profile
exports.saveProfile = async (req, res) => {
try {
    const { userId, name, email, phone, location, profilePic } = req.body;
    let profile = await Profile.findOneAndUpdate(
      { userId },
      { name, email, phone, location, profilePic },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get profile by userId
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
