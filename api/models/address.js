const { Schema, model } = require("mongoose");

const AddressSchema = Schema({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  city:{
    type: String,
    require: true,
  },
  province:{
      type: String,
      require: true
  },
  phone_number:{
      type: String,
      require: true
  },
  notes:{
      type: String,  
  },
  state:{
      type: Boolean,
      default: false,
  }
});

AddressSchema.methods.toJSON = function () {
  const { ...data } = this.toObject();
  return data;
};

module.exports = model("Address", AddressSchema);
