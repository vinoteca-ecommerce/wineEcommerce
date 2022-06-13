const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique : true,
  },
  producer: {
    type: String,
    required: [true, "Producer is required"],
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, "Price cant be negative"],
    required: [true, "Price is required"],
  },
  img: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  stock: {
    type: Number,
    min: [0, "Stock cant be negative"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  strain: {
    type: String,
    required: [true, "Straing is required"],
  },
  state:{
      type: Boolean,
      default: true,
  },
  quantity:{
    type:Number,
    default:0
  },
  comment: {
    type: Array
  },
  discount:{
    type: Number,
    default: 0
  }
});

ProductSchema.methods.toJSON = function(){
  const {__v, state, ...data} = this.toObject();
  return data
}


module.exports = model("Product", ProductSchema);
