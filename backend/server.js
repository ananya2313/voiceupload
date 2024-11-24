const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFormats = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/opus', 'audio/ogg'];
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).single('voiceFile');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File too large! Maximum size is 5 MB.' });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
