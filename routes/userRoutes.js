const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  resetPassword,
  uploadProfile,
  VerficationStatus,
  userHistory,
  getHistory,
  userStatus,
  sendOtp,
  verifyOtp,
  reward,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware.js");

const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/profile/password/reset").post(protect, resetPassword);

router.post(
  "/upload-profile",
  protect,
  uploads.single("profile"),
  uploadProfile
);

router.post("/verify-status", protect, VerficationStatus);

router.post("/upload-status", protect, userStatus);
router.post("/user-history", protect, userHistory);
router.get("/get-history", protect, getHistory);
router
  .route("/:id")
  //   .delete(protect, deleteUser)
  .get(getUserById);
//   .put(protect, updateUser)
router.post("/send-otp", protect, sendOtp);
router.post("/verify-otp", protect, verifyOtp);
router.post("/reward", protect, reward);

module.exports = router;
