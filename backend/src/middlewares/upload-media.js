import fs from "fs";
import multer from "multer";

// creating a new folder if it doesn't exist
const uploadDir = "src/uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configuring multer to save files in the uploads folder with unique filenames and timestamps
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s+/g, "_"); 
    cb(null, Date.now() + "-" + filename);
  },
});

// defining the file filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
    "audio/mp3",
    "application/pdf",
    "application/msword",
    "video/mkv",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// exporting the multer middleware with the configured storage and file filter
export const upload = multer({
  storage,
  fileFilter,
});
