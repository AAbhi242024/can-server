/**
 * Subscription Plan Controller
 * @module controllers/subscriptionplan.controllers
 *
 */

const subscription_plan_model = require("../models/subcription.plan.model");
const user_model = require("../models/user.model");
const apiResponse = require("../response/apiResponse");
const { body, validationResult } = require("express-validator");
//const { sanitizeBody } = require("express-validator");

/**
 * Create Subscription Plan
 * @param {String} plan_name - Name of the plan
 * @param {Number} price - Price of the plan
 * @param {Number} duration - Duration of the plan
 * @param {String} description - Description of the plan
 * @param {String} status - Status of the plan
 * @param {String} created_at - Created date of the plan
 * @param {String} updated_at - Updated date of the plan
 * @param {String} deleted_at - Deleted date of the plan
 * @param {String} created_by - Created by of the plan
 * @param {String} updated_by - Updated by of the plan
 * @param {String} deleted_by - Deleted by of the plan
 * @param {String} deleted - Deleted status of the plan
 * @param {String} is_active - Active status of the plan
 * @param {String} is_deleted - Deleted status of the plan
 * @param {String} is_blocked - Blocked status of the plan
 * @param {String} is_verified - Verified status of the plan
 * @param {String} is_email_verified - Email verified status of the plan
 * @param {String} is_phone_verified - Phone verified status of the plan
 * @param {String} is_admin_verified - Admin verified status of the plan
 *
 */

//API to create subscription plan API

exports.add_subscription_plan = [
  // body("plan_name").isLength({ min: 1 }).trim().withMessage("Plan name must be specified."),
  // body("price").isLength({ min: 1 }).trim().withMessage("Price must be specified."),
  // body("duration").isLength({ min: 1 }).trim().withMessage("Duration must be specified."),
  // body("description").isLength({ min: 1 }).trim().withMessage("Description must be specified."),
  // body("status").isLength({ min: 1 }).trim().withMessage("Status must be specified."),
  // body("created_at").isLength({ min: 1 }).trim().withMessage("Created date must be specified."),
  // body("updated_at").isLength({ min: 1 }).trim().withMessage("Updated date must be specified."),
  // body("deleted_at").isLength({ min: 1 }).trim().withMessage("Deleted date must be specified."),
  // body("created_by").isLength({ min: 1 }).trim().withMessage("Created by must be specified."),
  // body("updated_by").isLength({ min: 1 }).trim().withMessage("Updated by must be specified."),
  // body("deleted_by").isLength({ min: 1 }).trim().withMessage("Deleted by must be specified."),
  // body("deleted").isLength({ min: 1 }).trim().withMessage("Deleted status must be specified."),
  // body("is_active").isLength({ min: 1 }).trim().withMessage("Active status must be specified."),
  // body("is_deleted").isLength({ min: 1 }).trim().withMessage("Deleted status must be specified."),
  // body("is_blocked").isLength({ min: 1 }).trim().withMessage("Blocked status must be specified."),
  // body("is_verified").isLength({ min: 1 }).trim().withMessage("Verified status must be specified."),
  // body("is_email_verified").isLength({ min: 1 }).trim().withMessage("Email verified status must be specified."),
  // body("is_phone_verified").isLength({ min: 1 }).trim().withMessage("Phone verified status must be specified."),
  // body("is_admin_verified").isLength({ min: 1 }).trim().withMessage("Admin verified status must be specified."),
  //sanitizeBody("*").escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error",
          errors.array()
        );
      }

      console.log("line 91", req.body.duration + " " + req.body.duration_type);

      let subscription_plan = new subscription_plan_model({
        plan_name: req.body.plan_name,
        price: req.body.price,
        duration: req.body.duration + " " + req.body.duration_type,
        duration_type: req.body.duration_type,
        description: req.body.description,
        status: req.body.status,
        plan_features: req.body.plan_features,
        // created_at:req.body.created_at,
        // updated_at:req.body.updated_at,
        // deleted_at:req.body.deleted_at,
        // created_by:req.body.created_by,
        // updated_by:req.body.updated_by,
        // deleted_by:req.body.deleted_by,
        // deleted:req.body.deleted,
        // is_active:req.body.is_active,
        // is_deleted:req.body.is_deleted,
        // is_blocked:req.body.is_blocked,
        // is_verified:req.body.is_verified,
        // is_email_verified:req.body.is_email_verified,
        // is_phone_verified:req.body.is_phone_verified,
        // is_admin_verified:req.body.is_admin_verified
      });
      const subscription_saved = await subscription_plan.save();
      console.log("line 93", subscription_saved);

      //now concatenate the duration and duration_type the return the plan
      // let duration_type=subscription_saved.duration_type;
      // let duration=subscription_saved.duration;
      // let duration_concat=duration+" "+duration_type;
      // subscription_saved.duration=subscription_saved.duration_type+" "+subscription_saved.duration;
      subscription_saved.duration_type = undefined;

      if (subscription_saved) {
        return apiResponse.successResponseWithData(
          res,
          "Subscription Plan Added Successfully",
          subscription_saved
        );
      } else {
        return apiResponse.validationErrorWithData(res, "Error Occurred");
      }
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];

//API to get all subscription plans

exports.get_all_subscription_plans = [
  async (req, res) => {
    try {
      const subscription_plans = await subscription_plan_model
        .find()
        .select("-duration_type");
      if (subscription_plans.length > 0) {
        return apiResponse.successResponseWithData(
          res,
          "Subscription Plans Found",
          subscription_plans
        );
      } else {
        return apiResponse.notFoundResponse(res, "No Subscription Plans Found");
      }
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];

//API to get subscription plan by id

exports.get_subscription_plan_by_id = [
  async (req, res) => {
    try {
      const subscription_plan = await subscription_plan_model
        .findById(req.params._id)
        .select("-duration_type");
      if (subscription_plan) {
        return apiResponse.successResponseWithData(
          res,
          "Subscription Plan Found",
          subscription_plan
        );
      } else {
        return apiResponse.notFoundResponse(res, "No Subscription Plan Found");
      }
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];

/** Update subscription plan
 * Whatever the field will come from the front end will be updated
 * else it will remain same
 * @param {String} plan_name - Name of the plan
 * @param {Number} price - Price of the plan
 */

exports.update_subscription_plan = [
  async (req, res) => {
    try {
      const subscription_plan = await subscription_plan_model.findById(
        req.params._id
      );
      if (subscription_plan) {
        //Update subscription plan
        const updated_subscription_plan =
          await subscription_plan_model.findByIdAndUpdate(
            req.params._id,
            {
              $set: req.body,
            },
            { new: true }
          );
        return apiResponse.successResponseWithData(
          res,
          "Subscription Plan Updated Successfully",
          updated_subscription_plan
        );
      } else {
        return apiResponse.notFoundResponse(res, "No Subscription Plan Found");
      }
    } catch (err) {
      return apiResponse.serverErrorResponse(
        res,
        "Server Error...!",
        err.message
      );
    }
  },
];
