const UpdatePost = require('../../models/updatepost.js');

module.exports = {
  createUpdate,
  showUpdates,

  // other functions as needed
};

async function createUpdate(req, res) {
  try {
    // Attach the user's ID from the JWT token to the update
    req.body.user = req.user._id;
    
    const update = await UpdatePost.create(req.body);
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create update.' });
  }
}

async function showUpdates(req, res) {
  try {
    const updates = await UpdatePost.find({}).sort({ date: -1 }); // This will fetch all posts and sort them in descending order based on the date
    res.status(200).json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch updates.' });
  }
}