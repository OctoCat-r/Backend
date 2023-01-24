const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const User = require("../Models/Sku1");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/Footox?retryWrites=true&w=majority';


const client = new MongoClient(dbURI);
const database = client.db("Footox");
const users = database.collection("data");

exports.create = async (req, res) => {
    console.log(req.file);
    const totalRecords = [];
    const productIds = []
    const productId = await users.find({}, {productId : 1}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        // productIds.push(result.productId)
        // console.log(productIds);
        // res.json(result);
    });
    if(req.file){
    try {
        console.log(path.join(__dirname, '../', '/CSVFile/csv/' + req.file.filename))
        fs.createReadStream(path.join(__dirname, '../', '/CSVFile/csv/' + req.file.filename))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => totalRecords.push(row))
            .on('data', row => console.log(row.productId))
            .on('end', async rowCount => {
                try {

                    const users = await User.insertMany(totalRecords);
                    res.json(users);
                } catch (err) {
                    res.status(400).json(err);
                }
            });

    } catch (error) {
        res.status(400).json(error)
    }
}else{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        productId:req.body.productId,
        SKUId: req.body.SKUId,
        Quantity: req.body.Quantity,
    });
    user.save().then(result => {
        console.log(result),
        res.status(201).json({
            message: "Done upload!",
            userCreated: {
                _id: result._id,
                productName:result.productName,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })

    
}
};

exports.stock = async(req, res) =>{
    User.find().then(data => {
        res.status(200).json(
            
        data
        );
    });

    // await User.find().fetch(function(err, result) {
    //     if (err) throw err;
        
    //     res.json(result); 
    // })
}

// exports.stock = await users.find({}).toArray(function(err, result) {
//     if (err) throw err;
    
//     res.json(result); 
// });