const { response } = require("express");
const Purchase = require("../models/purchase");

const getPurchase = async (req, res = response) => {
  const purchases = await Purchase.find();

  const user = req.user._id;

  const filter = purchases.filter(
    (e) => e.user._id.toString() === user.toString()
  );

  res.status(201).json(filter);
};

const getPurchases = async (req, res = response) => {

  const [total, purchases] = await Promise.all([
    Purchase.countDocuments(),
    Purchase.find().populate('user', 'name')
]);
  
 
  res.status(201).json({
    total,
    result: purchases
  });
};


const purchaseStatus = async (req, res = response) => {
  const { payment_id, status, cart } = req.body;

  const data = {
    payment_id,
    status,
    cart,
    user: req.user._id,
  };

  const purchase = new Purchase(data);

  await purchase.save();

  res.status(201).json(purchase._id);
};


const updateState = async (req, res = response ) => {

    const { id } = req.params
    const { payment_id , status } = req.body;
  
    const filter = await Purchase.findOneAndUpdate({id}, {payment_id, status},(error,data) =>{
      if (error){
        console.log(error)
      }else{
        console.log(data)
      }
    } ).clone()
    

      res.status(201).json(filter)
}


module.exports = {
  purchaseStatus,
  getPurchase,
  getPurchases,
  updateState
};
