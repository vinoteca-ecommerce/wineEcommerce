const { Schema, model } = require("mongoose");

const AdressSchema = Schema({
  name: {
    type: String,
    require: true
  },
  adress: {
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

AdressSchema.methods.toJSON = function () {
  const { ...data } = this.toObject();
  return data;
};

module.exports = model("Adress", AdressSchema);
