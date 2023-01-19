module.exports = (app) =>{
  const { addListing,upload,findListing ,propertyByUserId} = require('../controller/property');
const { webProtected } = require('../helper/auth');
  
  const router = require('express').Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))
  router.post('/addListing',upload.single('upload_file'),webProtected,addListing);
  router.get('/',webProtected,findListing);

  router.post('/get_property_by_id',webProtected,propertyByUserId);




  app.use('/api/listing',router);
}