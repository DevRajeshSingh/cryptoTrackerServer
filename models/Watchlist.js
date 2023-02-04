const mongoose = require("mongoose");
//Watchlisted Item Schema
const WatchlistedSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    watchlistIds: {
      type: Array,
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchlisted", WatchlistedSchema);
