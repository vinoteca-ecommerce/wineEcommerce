const { response } = require("express");
const {  purchaseEmail } = require("../helpers/mailler");
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
    Purchase.find().populate("user", "name"),
  ]);

  res.status(201).json({
    total,
    result: purchases,
  });
};

const purchaseStatus = async (req, res = response) => {
  const { payment_id, status, cart } = req.body;
console.log(cart)
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

const updateState = async (req, res = response) => {
  const { id } = req.params;
  const { payment_id, status } = req.body;

  const filter = await Purchase.findByIdAndUpdate(
    id,
    { payment_id, status },
    (error, data) => {
      if (error) {
        console.log(error);
      }
    }
  ).clone();

  res.status(201).json(filter);
};

const getPurchaseId = async (req, res=response) => {

  const { id } = req.params

  const filter = await Purchase.findById(id);

  if(!filter){
    return res.status(400).json({msg: 'Purchase doesnt exist on the DB'})
  }

  res.status(201).json(filter)


}

const confirmationEmail=(req,res)=>{
   purchaseEmail(req.user)
 
   res.json({msg:'Mail enviado correctamente.'})
}


module.exports = {
  purchaseStatus,
  getPurchase,
  getPurchases,
  updateState,
  getPurchaseId,
  confirmationEmail
};
