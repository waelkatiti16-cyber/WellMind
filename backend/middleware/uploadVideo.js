const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads", "videos");

// S'assurer que le dossier existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers vidéo sont autorisés"), false);
  }
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1 Go max par vidéo, ajustez si besoin
  }
});

module.exports = uploadVideo;
