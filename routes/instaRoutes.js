
let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
const {v4: uuidv4} = require('uuid');
// const uuid = require('uuid');
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


let User = require('../models/links');

router.post('/links', upload.array('image', 6), (req, res, next) => {
    // const reqFiles = [];
    // const url = req.protocol + '://' + req.get('host')
    // for (var i = 0; i < req.files.length; i++) {
    //     reqFiles.push(url + '/public/' + req.files[i].filename)
    // }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        link1:req.body.link1,
        link2: req.body.link2,
        link3: req.body.link3,
    });

    user.save().then(result => {
        console.log(result),
        res.status(201).json({
            message: "Done upload!",
            userCreated: {
                _id: result._id,
                link1:result.link1,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/link",(req,res,next)=>{
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
})


module.exports = router;