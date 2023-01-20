const { getImageUrl } = require('../helper/imageUpload');
const db = require('../models');
const Op = db.Sequelize.Op;
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

    const { user_id, first_name, last_name, upload_file, property_name, slug, property_address, address_line2, city, country, property_sale_status, property_purpose, property_category, property_permit, property_type, beds, baths, sqft, completion_status, ownership_status, amenities, floor_range, sale_value, payment_method, rent_per_year, rent_frequency, contract_period, vacancy_notice_period, maintanance_fee, paid_by,
        status, description, home_highlight,
    } = req.body;


    try {
        let imagePath = "";
        let propertySlug = ""

        if (req.body.property_name) {
            await generateSlug(req.body.property_name).then(pslug => {
                propertySlug = pslug;
            })
        }

        var icon = [];

        for (var i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname === 'upload_file') {
                await getImageUrl(req.files[i]).then(imgUrl => {
                    imagePath = imgUrl;
                })
            }
            await getImageUrl(req.files[i]).then(imgUrl => {
                var fieldname = req.files[i].fieldname
                home_highlight[fieldname] = imgUrl
                if (i >= 0) {
                    icon.push(imgUrl)

                }
                for (var k = 0; k < home_highlight.length; k++) {
                    home_highlight[k]['icon'] = icon[k]
                }
            })
        }


        var requestData = {
            user_id,
            first_name,
            last_name,
            upload_file: imagePath,
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
            description,
            home_highlight,
            status
        };

        console.log(requestData)

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

        const users = await Property.findAll({ include: User, attributes: { exclude: ['password'] } });

        if (users) {
            const filteredUsers = users.filter(user => {
                let isValid = true;
                for (key in filters) {
                  console.log(key, user[key], filters[key]);
                  isValid = isValid && user[key] == filters[key];
                }
                return isValid;
              });
            res.status(200).send(filteredUsers)
        } else {
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
        if (!property) {
            res.status(201).send({ message: 'No property slug found' })

        } else {

            res.status(200).send(property)
        }
    } catch (error) {
        res.status(400).send({ message: 'Oops! something went wrong in get Property' })
    }
}
