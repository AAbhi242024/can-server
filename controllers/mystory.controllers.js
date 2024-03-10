/**
 * Mystory Controllers
 */

const mystory_model = require("../models/mystory.model");
const user_model = require("../models/user.model");
//const comment_model = require("../models/comment.model");
const { validationResult } = require("express-validator");
const apiResponse = require("../response/apiResponse");
const login_validator =
  require("../middlewares/jwt.auth.middleware").authentication;
  const profilePin_validator=require("../middlewares/profile.pin.auth.middleware").profilePinAuthenticate
const awsS3 = require("../helpers/aws.s3");
//const { sendOTP } = require("../helpers/helpers");

const multer = require("multer");

//multer storage
const upload = multer({ storage: multer.memoryStorage() });

// Create and Save a new Mystory
exports.add_mystory = [
  login_validator,
//profilePin_validator,
  upload.array("media_files", 10),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id, post_title,  post_description, media_files } = req.body;
      if (!post_title) {
        return apiResponse.validationErrorWithData(
          res,
          "Post Title is required"
        );
      }

      //uploading media files to s3 bucket
      const media_files_url = await awsS3.multiple_file_upload(req.files);
      console.log(media_files_url);
      console.log("line 42",req.user.user);

      const mystory = new mystory_model({
        post_title: post_title,
        post_description:  post_description,
        media_files: media_files_url,
        CANID: req.user.user.CANID,
      });
      const saved_mystory = await mystory.save();
      return apiResponse.successResponseWithData(
        res,
        "Successfully, Story Added!",
        saved_mystory
      );
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];

//Get All POST/STORY LIST OF USER

exports.get_mystory_list = [
  login_validator,
  async (req, res) => {
    try {
      console.log("line 77",req.user.user._id)
      const mystory_list = await mystory_model.find({
       // user_id: req.user.user._id,
      });
      return apiResponse.successResponseWithData(
        res,
        "Mystory List Fetched",
        mystory_list
      );
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];