const router = require("express").Router();
const Watchlist = require("../models/Watchlist");

const { verifyAccessTokenAndAuthorization } = require("./verifyAccessToken");

//Get Watchlist
router.get("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({
      userId: req.params.id,
    });
    res.status(200).json(watchlist);
  } catch (err) {
    err.message = "Unable to get watchlist";
    res.status(500).json(err);
  }
});

//Create Watchlist
router.post("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    //check if watchlist already exists
    const watchlist = await Watchlist.findOne({
      userId: req.params.id,
    });
    if (watchlist) {
      return res.status(400).json({ message: "Watchlist already exists" });
    }
    //create new watchlist
    const newWatchlist = new Watchlist(req.body);
    const savedWatchlist = await newWatchlist.save();
    res.status(200).json(savedWatchlist);
  } catch (error) {
    error.message = "Something went wrong";
    res.status(500).json(error);
  }
});

//Update Watchlist
router.put("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    err.message = "Something went wrong";
    res.status(500).json(error);
  }
});

//Delete Watchlist
router.delete("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const deletedWatchlist = await Watchlist.findOneAndDelete({
      userId: req.params.id,
    });
    res.status(200).json(deletedWatchlist);
  } catch (error) {
    err.message = "Something went wrong";
    res.status(500).json(error);
  }
});

module.exports = router;
