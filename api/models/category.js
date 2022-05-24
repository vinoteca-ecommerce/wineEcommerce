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
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
