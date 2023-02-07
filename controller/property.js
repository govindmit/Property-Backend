const {
  getImageUrl,
  getVideoUrl,
  getpdfUrl,
  getpdfUrl1,
} = require("../helper/imageUpload");
const db = require("../models");
const Op = db.Sequelize.Op;
const multer = require("multer");
const { generateSlug } = require("../helper/propertySlug.helper");
const { sequelize } = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

exports.upload = multer({ storage: storage });

const Property = db.property;
const User = db.User;

exports.addListing = async (req, res) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  const {
    user_id,
    first_name,
    last_name,
    upload_file,
    property_name,
    slug,
    property_address,
    address_line2,
    city,
    country,
    property_sale_status,
    property_purpose,
    property_category,
    property_permit,
    property_type,
    beds,
    baths,
    sqft,
    completion_status,
    ownership_status,
    amenities,
    occupancy_status,
    open_house_time,
    sale_value,
    payment_method,
    rent_per_year,
    rent_frequency,
    contract_period,
    vacancy_notice_period,
    maintanance_fee,
    paid_by,
    landmark,
    upload_video_title,
    upload_video_description,
    maid_room,
    status,
    floor_planes,
    notes,
    description,
    home_highlight,
    upload_docs,
    property_condition,
  } = req.body;
  try {
    let imagePath = [];
    let videoPath = [];
    let docs = [];
    let propertySlug = "";
    var plan = [];
    var plan1 = [];
    var plan2 = [];
    var plan3 = [];
    var plan4 = [];
    var plan5 = [];
    var plan6 = [];
    var plan7 = [];
    if (req.body.property_name) {
      await generateSlug(req.body.property_name).then((pslug) => {
        propertySlug = pslug;
      });
    }

    var icon = [];
    for (var i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname === "upload_file") {
        if (req.files[i].mimetype === "video/mp4") {
          await getVideoUrl(req.files[i]).then((vidUrl) => {
            videoPath.push(vidUrl);
          });
        } else {
          await getImageUrl(req.files[i]).then((imgUrl) => {
            imagePath.push(imgUrl);
          });
        }
      }
    }

    for (var i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname != "upload_file") {
        await getImageUrl(req.files[i]).then((imgUrl) => {
          var fieldname = req.files[i].fieldname;
          home_highlight[fieldname] = imgUrl;
          if (i >= 0) {
            icon.push(imgUrl);
          }
          for (var k = 0; k < home_highlight.length; k++) {
            home_highlight[k]["icon"] = icon[k];
          }
        });
      }
    }
    for (var i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname === "upload_docs") {
        await getpdfUrl(req.files[i]).then((imgUrl) => {
          docs.push(url.origin + imgUrl);
        });
      }
    }

    for (var i = 0; i < req.files.length; i++) {
      const keyid = `floor_planes[${i}][plan_drawing]`;

      for (var j = 0; j < req.files.length; j++) {
        if (req.files[j].fieldname === keyid) {
          await getpdfUrl1(req.files[j]).then((imgUrl) => {
            var fieldname = req.files[j].fieldname;
            floor_planes[fieldname] = imgUrl;
            if (keyid === "floor_planes[0][plan_drawing]") {
              // plan.push(url.origin + imgUrl);
              plan.push(imgUrl);
              // for (var k = 0; k < floor_planes.length; k++) {
              floor_planes[0]["plan_drawing"] = plan;
              // }
            } else if (keyid === "floor_planes[1][plan_drawing]") {
              plan1.push(imgUrl);
              floor_planes[1]["plan_drawing"] = plan1;
            } else if (keyid === "floor_planes[2][plan_drawing]") {
              plan2.push(imgUrl);
              floor_planes[2]["plan_drawing"] = plan2;
            } else if (keyid === "floor_planes[3][plan_drawing]") {
              plan3.push(imgUrl);
              floor_planes[3]["plan_drawing"] = plan3;
            } else if (keyid === "floor_planes[4][plan_drawing]") {
              plan4.push(imgUrl);
              floor_planes[4]["plan_drawing"] = plan4;
            } else if (keyid === "floor_planes[5][plan_drawing]") {
              plan5.push(imgUrl);
              floor_planes[5]["plan_drawing"] = plan5;
            } else if (keyid === "floor_planes[6][plan_drawing]") {
              plan6.push(imgUrl);
              floor_planes[6]["plan_drawing"] = plan6;
            } else if (keyid === "floor_planes[7][plan_drawing]") {
              plan7.push(imgUrl);
              floor_planes[7]["plan_drawing"] = plan7;
            }
          });
        }
      }
    }
    let arrImg = { imagee: imagePath, videos: videoPath };
    var requestData = {
      user_id,
      first_name,
      last_name,
      upload_file: arrImg,
      property_name,
      slug: propertySlug,
      property_address,
      address_line2,
      city,
      country,
      property_sale_status,
      property_purpose,
      property_category,
      property_permit,
      property_type,
      beds,
      baths,
      sqft,
      completion_status,
      ownership_status,
      upload_video_title,
      upload_video_description,
      amenities,
      floor_planes,
      occupancy_status,
      sale_value,
      payment_method,
      rent_per_year,
      rent_frequency,
      maid_room,
      contract_period,
      vacancy_notice_period,
      maintanance_fee,
      property_condition,
      paid_by,
      open_house_time,
      notes,
      description,
      home_highlight,
      status,
      landmark,
      upload_docs: docs,
    };

    await Property.create(requestData).then((data) => {
      if (!data) {
        res.status(400).send({ message: "somthing went wrong to add list." });
      } else {
        res
          .status(200)
          .send({ message: "listing create successfully .", data: data });
      }
    });
  } catch (err) {
    res.status(400).send({
      ErrMessage: err.message,
      subError: "Opps! something went wrong to create listing",
    });
  }
};

// exports.findListing = async (req, res) => {
//     try {

//         const f1 = req.query.property_purpose;
//         const f2 = req.query.property_category;
//         const beds = req.query.beds;

//         var condition = f1 ? { [Op.or]: [{ property_purpose: f1 }], [Op.and]: [{ is_deleted: false }], } : { is_deleted: false };

//         // var condition = { [Op.and]: [{ property_purpose: f1 },{ property_category: f2 }] }

//         const users = await Property.findAll({ include: User, attributes: { exclude: ['password'] } });

//         if (users) {
//             res.status(200).send(users)
//         } else {
//             res.status(200).send("no listing")
//         }

//     } catch (error) {
//         res.status(400).send({
//             message: 'Oops! something went wrong while fetching the users',
//             subError: error.message
//         })
//     }

// };

exports.findListing = async (req, res) => {
  try {
    const f1 = req.query.property_purpose;
    const f2 = req.query.property_category;
    const beds = req.query.beds;

    const filters = req.query;

    const users = await Property.findAll({
      include: User,
      attributes: { exclude: ["password"] },
    });

    if (users) {
      const filteredUsers = users.filter((user) => {
        let isValid = true;
        for (key in filters) {
          isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      res.status(200).send(filteredUsers);
    } else {
      res.status(200).send("no listing");
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

///////////////////////////
// exports.findListing = async (req, res) => {
//   try {
//     const f1 = req.query.property_purpose;
//     const f2 = req.query.property_category;
//     const beds = req.query.beds;

//     const filters = req.query;
//     const filt = {
//       property_purpose: filters.property_purpose,
//       property_type: filters.property_type,
//       beds: filters.beds,
//       baths: filters.baths,
//     };
//     const users = await Property.findAll({
//       include: User,
//       attributes: { exclude: ["password"] },
//     });
//     if (users) {
//       const a = users.filter((user) => {
//         let isValid = true;
//         for (key in filt) {
//           isValid = isValid && user[key] == filt[key];
//         }
//         return isValid;
//       });
     
//       //rent_per_year let c=await Property.findAll()
//       // const checkPrice=sale_value===null?sale_value:rent_per_year;
//       let b = await Property.findAll({
//         where: {
//        sale_value: {
//             [Op.lte]: filters.max,
//             [Op.gte]: filters.min,
//           },
//         },
//       });
//       console.log('&&&&&&&&&&&&&&&&',b);
//       // let c = await Property.findAll({
//       //   where: {
//       //     rent_per_year: {
//       //       [Op.lte]: filters.max,
//       //       [Op.gte]: filters.min,
//       //     },
//       //   },
//       // });
//       // console.log('$$$$$$$$$$$$$$',c);
//       const result1 = a.filter(function (o1) {
//         return b.some(function (o2) {
//           return o1.slug == o2.slug; // slug is unnique both array object
//         });
//       });

//       if (filters?.min === undefined) {
//         res.status(200).send(a);
//       } else {
//         res.status(200).send(result1);
//       }
//     } else {
//       res.status(200).send("no listing");
//     }
//   } catch (error) {
//     res.status(400).send({
//       message: "Oops! something went wrong while fetching the users",
//       subError: error.message,
//     });
//   }
// };


/////////////////////////////

exports.findPropertyById = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      res.status(201).send({ message: "property slug required !" });
      return;
    }
    const property = await Property.findOne( {include: User},{ where: { slug: slug } });
    if (!property) {
      res.status(201).send({ message: "No property slug found" });
    } else {
      res.status(200).send(property);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Oops! something went wrong in get Property" });
  }
};

exports.visitedPropertyNumberOfTime = async (req, res) => {
  try {
    const propertyid = req.query.id;
    var count = 0;
    var updateData = {
      visitedNumberOfTime: "",
    };
    if (!propertyid) {
      res.status(400).send({
        message: "property_id is required ",
      });
    } else {
      await Property.findOne({ where: { id: propertyid } }).then((preData) => {
        if (!preData) {
          res.status(200).send({
            message: "Property is not there ",
          });
        } else {
          count = preData.visitedNumberOfTime;
          updateData.visitedNumberOfTime = count + 1;
          Property.update(updateData, { where: { id: propertyid } })
            .then((data) => {
              res.status(200).send({
                message: "Visit count successfully added",
              });
            })
            .catch((error) => {
              res.status(400).send({
                message: "Oops! something went wrong in visit",
                subError: error.message,
              });
            });
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in visit",
      subError: error.message,
    });
  }
};

exports.popularProperty = async (req, res) => {
  let propertyCount = [];
  let arrData = [];
  var newData;
  const filters = req.query;
  try {

    let findproperty = await Property.findAll({
      where: {
        visitedNumberOfTime: {
          [Op.gt]: 0
        }
      },order: [
        ["visitedNumberOfTime", "DESC"]
    ]
    })
    if (findproperty) {
      const filteredUsers = findproperty.filter((user) => {
        let isValid = true;
        for (key in filters) {
          isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      res.status(200).send({data:filteredUsers});
    } else {
      res.status(200).send("no listing");
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};
