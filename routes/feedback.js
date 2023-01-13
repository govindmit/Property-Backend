
module.exports = app => {
    const feedback = require("../controller/feedback");
    var router = require("express").Router();
  
    router.post("/feedbacklink", feedback.createLink);
    router.get("/findAllFeedback", feedback.findAllFeedback);
    router.get("/findAllCustomerFeedback", feedback.findAllCustomerFeedback);
    router.get("/findCustomerFeedbackByUserId/:id?", feedback.findCustomerFeedbackByUserId);
    
    app.use('/api/feedback', router);
  };
  
  