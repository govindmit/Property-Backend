module.exports = (app) =>{
  const { addListing,upload,findListing ,findPropertyById} = require('../controller/property');
const { webProtected } = require('../helper/auth');
  
  const router = require('express').Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))
  router.post('/addListing',upload.any(),webProtected,addListing);
  router.get('/',webProtected,findListing);
  router.get('/:slug',webProtected ,findPropertyById);

  app.use('/api/listing',router);
}