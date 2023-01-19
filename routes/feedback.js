
module.exports = app => {
    const feedback = require("../controller/feedback");
    var router = require("express").Router();
  
    router.post("/feedbacklink", feedback.createLink);
    router.get("/findallfeedback", feedback.findAllFeedback);
    router.get("/find_all_customer_feedback", feedback.findAllcustomer_feedback);
    router.get("/customer_feedback_by_userid/:id?", feedback.findcustomer_feedbackByUserId);
    
    app.use('/api/feedback', router);
  };  
  
  