const express = require('express');
const multer = require('multer');
const uploadFile = require('../utils/s3Upload');
const Media = require('../models/Media');
const auth = require('../middleware/auth');
const AWS = require('aws-sdk');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const result = await uploadFile(req.file);
        const media = new Media({
        filename: req.file.originalname,
        url: result.Location,
        user: req.user._id,
        });
        await media.save();
        res.status(201).json(media);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', auth, async (req, res) => { 
    try {
      console.log("User ID from Auth Middleware:", req.user._id);
      const media = await Media.find({ user: req.user._id });
      res.json(media);
    } catch (err) {
      console.error("Error Fetching Media:", err.message);
      res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ error: 'Media not found' });
        }

        // Delete from S3
        const s3 = new AWS.S3();
        const key = new URL(media.url).pathname.substring(1);
        console.log("extracted key: ", key);
        await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        }).promise();

        // Delete from MongoDB
        await Media.findByIdAndDelete(req.params.id);
        res.json({ message: 'Media deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;