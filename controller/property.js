const { getImageUrl } = require('../helper/imageUpload');
const db = require('../models');
const multer = require("multer");
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

    const { userId, firstName, lastName, uploadFile, propertyName, propertyAddress, addressLine2, city, country, propertySaleStatus, propertyPurpose, propertyCategory, propertyPermit, propertyType, beds, baths, sqft, completionStatus, ownershipStatus, amenities, floorRange, saleValue, paymentMethod, rentPerYear, rentFrequency, contractPeriod, vacancyNoticePeriod, maintananceFee, paidBy,
        status
    } = req.body;


    try {
        let imagePath = "";
        if (req.file) {
            await getImageUrl(req.file).then(imgUrl => {
                imagePath = imgUrl;
            })
        }

        var requestData = {
            userId,
            firstName,
            lastName,
            uploadFile: imagePath,
            propertyName,
            propertyAddress,
            addressLine2,
            city,
            country,
            propertySaleStatus,
            propertyPurpose,
            propertyCategory,
            propertyPermit,
            propertyType,
            beds,
            baths,
            sqft,
            completionStatus,
            ownershipStatus,
            amenities,
            floorRange,
            saleValue,
            paymentMethod,
            rentPerYear,
            rentFrequency,
            contractPeriod,
            vacancyNoticePeriod,
            maintananceFee,
            paidBy,
            status
        };

        await Property.create(requestData).then((data) => {
            if (!data) {
                res.status(400).send({ message: 'somthing went wrong to add list.' })
            } else {
                res.status(200).send({ message: 'listing create successfully .', data: data })

            }
        })

    } catch (err) {
        res.status(400).send({ ErrMessage: err.message, subError: 'Opps! something went wrong to create listing' })
    }
}

exports.findListing = async (req, res) => {
    try {

        const users = await Property.findAll({include: User, attributes: { exclude: ['password'] }});
        if(users){

            res.status(200).send(users)
        }else{
            res.status(200).send("no listing")
            
        }

    } catch (error) {
        res.status(400).send({
            message: 'Oops! something went wrong while fetching the users',
            subError: error.message
        })
    }
  };
  