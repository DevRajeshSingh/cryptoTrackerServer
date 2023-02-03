const mongoose = require("mongoose");
//Portfolio Schema
const PortfolioSchema = new mongoose.Schema(
  {
    unique_id: {
      type: String,
      unique: true, 
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    priceBought: {
      type: Number,
      required: true,
    },
    quantityBought: {
      type: Number,
      required: true,
    },
    ticker: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolip", PortfolioSchema);
