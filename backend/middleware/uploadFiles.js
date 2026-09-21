const multer = require("multer");
const path = require("path");
const fs = require("fs");

const baseUploadDir = path.join(__dirname, "..", "uploads");

const makeStorage = (subfolder) => {
  const dir = path.join(baseUploadDir, subfolder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    }
  });
};

// Upload d'une photo (jpeg, png, webp...)
const uploadImage = multer({
  storage: makeStorage("images"),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers image sont autorisés"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo max
});

// Upload d'un CV (PDF)
const uploadCv = multer({
  storage: makeStorage("cv"),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Le CV doit être un fichier PDF"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Mo max
});

module.exports = { uploadImage, uploadCv };
