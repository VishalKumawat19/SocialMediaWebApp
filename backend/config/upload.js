const multer = require('multer');
const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
// Multer setup with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'your-folder' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream._read = () => {}; // No-op
    readableStream.push(file.buffer);
    readableStream.push(null);

    readableStream.pipe(stream);
  });
};

module.exports = { upload, uploadToCloudinary };
