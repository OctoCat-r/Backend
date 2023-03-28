// import {v4 as uuidv4} from 'uuid';

let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  router = express.Router();
const { v4: uuidv4 } = require("uuid");
// const uuid = require('uuid');
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log(file, "file");
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// User model
let User = require("../models/models");

router.post("/admin3", upload.array("image", 50), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
    var temp=[];
    var all=[];
  for (var i = 1; i < req.files.length+1; i++) {

    temp.push(url + "/public/" + req.files[i-1].filename);
    if(i%5===0){
        all.push(temp);
         temp=[];
        
    }
    // reqFiles.push(url + "/public/" + req.files[j].filename);
  }




    // for (var i = 0; i < req.files.length; i++) {
    //   reqFiles.push(url + "/public/" + req.files[i].filename);
    // }

  const size = req.body.Sizes;
  const sizes = [];

  for (var i = 0; i < size.length; i++) {
    sizes[i] = JSON.parse("[" + size[i] + "]");
  }
  console.log(sizes);
  // const images
  console.log(all, "mjjhh");
  // console.log(size.length);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    productId: req.body.productId,
    productName: req.body.productName,
    productGender: req.body.productGender,
    description: req.body.description,
    selling_price: req.body.selling_price,
    original_price: req.body.original_price,
    Sizes: sizes,
    color: req.body.color,
    Status: req.body.Status,
    createdDate: req.body.CurrentDate,
    modifiedDate: req.body.UpdatedDate,
    // Sizes:req.body.Sizes
    category: req.body.category,
    // featured:req.body.featured,
    image: all,
  });

  user
    .save()
    .then((result) => {
      console.log(result),
        res.status(201).json({
          message: "Done upload!",
          userCreated: {
            _id: result._id,
            productName: result.productName,
            image: result.image,
          },
        });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

router.get("/getImage", (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json({
     data,
    });
  });
});

router.get("/public/:img", (req, res) => {
  // console.log(req.params.img);

  res.sendFile(`${req.params.img}`, { root: "public" });
});

module.exports = router;