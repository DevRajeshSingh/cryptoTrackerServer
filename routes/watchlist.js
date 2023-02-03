const router = require("express").Router();
const Watchlist = require("../models/Watchlist");

const { verifyAccessTokenAndAuthorization } = require("./verifyAccessToken");

//Get Watchlist
router.get("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({
      id: req.params.id,
    });
    res.status(200).json(watchlist);
  } catch (err) {
    err.message = "Unable to get watchlist";
    res.status(500).json(err);
  }
});

//Create Watchlist
router.post("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  const newCat = new Watchlist(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    err.message = "Something went wrong";
    res.status(500).json(err);
  }
});

//Update Watchlist
router.put("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      { email: req.body.email },
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
      email: req.body.email,
    });
    res.status(200).json(deletedWatchlist);
  } catch (error) {
    err.message = "Something went wrong";
    res.status(500).json(error);
  }
});

module.exports = router;
