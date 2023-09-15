const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));



const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/updates', require('./routes/api/updates.js'));




app.get('/api/tiktok-oembed', async (req, res) => {
  const { videoUrl } = req.query;

  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/${videoUrl}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching TikTok oEmbed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
