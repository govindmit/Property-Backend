const db = require("../models");
const Feedback = db.feedback;
const FeedbackCustomer = db.feedbackCustomer;
const User = db.User;
const jsonwebtoken = require("jsonwebtoken");

exports.createLink = async (req, res) => {
  try {
    if (!req.body.link) {
      res.status(400).send({
        message: "link is required !",
      });
      return;
    }
    const feed = {
      link: req.body.link,
      user_id: req.body.user_id,
    };
    const detailss = {
      customer_detail: req.body.customer_detail,
    };
    const feedbacks = await Feedback.create(feed);
    if (feedbacks) {
      const feedbackid = feedbacks.dataValues.id;
      detailss.customer_detail.forEach(async (element, index, array) => {
        let reqestData = {
          feedback_id: feedbackid,
          customer_name: element.customer_name,
          customer_number: element.customer_number,
        };
        await FeedbackCustomer.create(reqestData);
      });
      res.send({ message: "feedback created successfully" });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops ! something went wrong.",
      subError: error.message,
    });
  }
};
exports.findAllFeedback = async (req, res) => {
  try {
    const newFeed = await Feedback.findAll({ include: db.User });
    res.status(200).send(newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

exports.findAllcustomer_feedback = async (req, res) => {
  try {
    const newFeed = await Feedback.findAll({
      include: [{ model: FeedbackCustomer }, db.User],
    });
    res.status(200).send(newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

exports.findcustomer_feedbackByUserId = async (req, res) => {
  var id = req.params.id;
  try {
    const newFeed = await User.findAll({
      include: [
        {
          model: Feedback,
          include: [FeedbackCustomer],
          where: { user_id: id },
        },
      ],
    });
    res.status(200).send(newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};
