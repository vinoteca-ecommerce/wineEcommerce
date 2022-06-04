const { Schema, model } = require("mongoose");

const PurchaseSchema = Schema({
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default:"pending"
  },
  cart: {
    type: Array,
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  payment_id:{
    type: String,
    require: true,
    default:"pending"
  }
});

PurchaseSchema.methods.toJSON = function () {
  const { ...data } = this.toObject();
  return data;
};

module.exports = model("Purchase", PurchaseSchema);
