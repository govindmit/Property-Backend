module.exports = (app) =>{
    const { addListing,upload,findListing } = require('../controller/property');
  const { webProtected } = require('../helper/auth');
    
    const router = require('express').Router();
    const express = require('express');
    app.use(express.static(__dirname + '/public'));
    app.use('/upload', express.static('upload'))
    router.post('/addListing',upload.single('uploadFile'),webProtected,addListing);
    router.get('/',findListing);


    app.use('/api/listing',router);
}