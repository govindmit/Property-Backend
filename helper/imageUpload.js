var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");


exports.getImageUrl = async (pics)=>{
    var imageurl = '';
    var data = new FormData();
    data.append(
      "file",
      fs.createReadStream(pics.path)
    );
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "piyushproj");

    var config = {
      method: "post",
      url: "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
   await axios(config)
      .then(function (response) {
        // console.log(response.data.url);
        imageurl = response.data.url
      })
      .catch(function (error) {
        console.log(error);
      });
    return imageurl
  }


  exports.getVideoUrl = async (pics)=>{
    var videUrl = '';
    var data = new FormData();
    data.append(
      "file",
      fs.createReadStream(pics.path)
    );
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "piyushproj");

    var config = {
      method: "post",
      url: "https://api.cloudinary.com/v1_1/piyushproj/video/upload",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
   await axios(config)
      .then(function (response) {
        // console.log(response.data.url);
        videUrl = response.data.url
      })
      .catch(function (error) {
        console.log(error);
      });
    return videUrl
  }
  

exports.getpdfUrl = async (pics)=>{
  var imageurl = '';
  var data = new FormData();
  data.append(
    "file",
    fs.createReadStream(pics.path)
  );
  data.append("upload_preset", "chat-app");
  data.append("cloud_name", "piyushproj");

  var config = {
    method: "post",
    url: "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };
 await axios(config)
    .then(function (response) {
      imageurl = '/upload/'+response.data.original_filename +'.'+response.data.format
    })
    .catch(function (error) {
      console.log(error);
    });
  return imageurl
}


exports.getpdfUrl1 = async (pics)=>{
  var imageurl = '';
  var data = new FormData();
  data.append(
    "file",
    fs.createReadStream(pics.path)
  );
  data.append("upload_preset", "chat-app");
  data.append("cloud_name", "piyushproj");

  var config = {
    method: "post",
    url: "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };
 await axios(config)
    .then(function (response) {
      // imageurl = '/upload/'+response.data.original_filename +'.'+response.data.format
      imageurl = response.data.url
    })
    .catch(function (error) {
      console.log(error);
    });
  return imageurl
}