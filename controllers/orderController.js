let User = require('../models/Order');

exports.order = async (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email: req.body.email,
        PhoneNumber: req.body.mobile,
        address: req.body.address,
        skuid: req.body.skuid,
        quantity:req.body.quantity,
        TotalAmount: req.body.TotalAmount,
    });
    user.save().then(result => {
        console.log(result),
        res.status(201).json({
            message: "Done upload!",
            userCreated: {
                _id: result._id,
                name:result.name,
                email:result.email
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
}
exports.getOrder = async (req, res) => {
    User.find().then((data) => {
      res.status(200).json(data);
    });
  };