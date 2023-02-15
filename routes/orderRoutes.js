const express = require("express");
const orderController = require('../controllers/orderController');
const router = express.Router();


router.post(
    "/order",
    orderController.order,
  )
  
router.get("/getOrder",orderController.getOrder);

module.exports = router;
