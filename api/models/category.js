const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    enum: ["Blanco", "Tinto", "Espumante", "Rose"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
});

CategorySchema.methods.toJSON = function (){
  const { _id, ...data } = this.toObject();
  return data
}


module.exports = model("Category", CategorySchema);