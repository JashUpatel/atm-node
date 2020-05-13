const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  card: {
    type: Number,
    required: true,
    trim: true,
  },

  account: {
    type: Number,
    required: true,
    trim: true,
  },

  balance: {
    type: Number,
    required: true,
    trim: true,
  },

  pin: {
    type: Number,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
