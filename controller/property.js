const { getImageUrl } = require('../helper/imageUpload');
const db = require('../models');
const multer = require("multer");
const { generateSlug } = require('../helper/propertySlug.helper');
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

    const { user_id, first_name, last_name, upload_file, property_name,slug, property_address, address_line2, city, country, property_sale_status, property_purpose, property_category, property_permit, property_type, beds, baths, sqft, completion_status, ownership_status, amenities, floor_range, sale_value, payment_method, rent_per_year, rent_frequency, contract_period, vacancy_notice_period, maintanance_fee, paid_by,
        status
    } = req.body;


    try {
        let imagePath = "";
        let propertySlug= ""
        if (req.file) {
            await getImageUrl(req.file).then(imgUrl => {
                imagePath = imgUrl;
            })
        }

        if(req.body.property_name){
            await generateSlug(req.body.property_name).then(pslug=>{
                propertySlug = pslug;
            })
        }

        var requestData = {
            user_id,
            first_name,
            last_name,
            upload_file: imagePath,
            property_name,
            slug:propertySlug,
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
            floor_range,
            sale_value,
            payment_method,
            rent_per_year,
            rent_frequency,
            contract_period,
            vacancy_notice_period,
            maintanance_fee,
            paid_by,
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
  

  exports.findPropertyById = async (req, res) => {
    try {
      const slug = req.params.slug;
      if (!slug) {
        res.status(201).send({ message: 'property slug required !' })
        return
      }
      const property = await Property.findOne({ where: { slug: slug } });
      if(!property){
        res.status(201).send({message:'No property slug found'})

      }else{

          res.status(200).send(property)
      }
    } catch (error) {
      res.status(400).send({ message: 'Oops! something went wrong in get Property' })
    }
  }
  