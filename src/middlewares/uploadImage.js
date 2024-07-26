const multer = require('multer');
const sharp = require('sharp');
const path = require('path');


// Configure multer storage
const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "_" + uniqueSuffix + ".jpeg");
    }
});

// Multer file filter to accept only images
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported file format' }, false);
    }
};

// Multer upload instance with storage, file filter, and limits
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 }, // 2MB file size limit
});

// Middleware to resize product images
const productImageResize = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        await Promise.all(req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(path.join(__dirname, '../../public/images/products', file.filename));
        }));
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware to resize blog images
const blogImageResize = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        await Promise.all(req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(path.join(__dirname, '../../public/images/blogs', file.filename));
        }));
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadPhoto, productImageResize, blogImageResize };
