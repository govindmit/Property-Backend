const db = require("../models");
const Feedback = db.feedback;
const FeedbackCustomer = db.feedbackCustomer;
const jsonwebtoken = require("jsonwebtoken");
const User = db.User;

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
      userId: req.body.userId,
    };
    const feedbacks = await Feedback.create(feed);
    if (feedbacks) {
      const customerData = {
        customerDetails: req.body.customerDetails,
        feedbackId: feedbacks.dataValues.id,
      };
      await FeedbackCustomer.create(customerData).then((data) => {
        res.status(200).send(data);
      });
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

    console.log("@@@@@@@@@@@@@", newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

exports.findAllCustomerFeedback = async (req, res) => {
  try {
    const newFeed = await FeedbackCustomer.findAll({
      include: [{ model: Feedback, include: [User] }],
    });
    res.status(200).send(newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

exports.findCustomerFeedbackByUserId = async (req, res) => {
  var id = req.params.id;
  try {
    const newFeed = await FeedbackCustomer.findAll({
      include: [{ model: Feedback, include: [User], where: { userId: id } }],
    });
    res.status(200).send(newFeed);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};
