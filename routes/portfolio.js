const router = require("express").Router();
const Portfolio = require("../models/Portfolio");

const { verifyAccessTokenAndAuthorization } = require("./verifyAccessToken");

//Get Portfolio lists
router.get("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const cont = await Portfolio.find({ userId: req.params.id });
    res.status(200).json(cont);
  } catch (err) {
    err.message = "Portfolio not found";
    res.status(500).json(err);
  }
});

//Create Portfolio
router.post("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  const newCat = new Portfolio(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    err.message = "Something went wrong";
    res.status(500).json(err);
  }
});

//Delete Portfolio
router.delete("/:id", verifyAccessTokenAndAuthorization, async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findOneAndDelete({
      unique_id: req.body.unique_id,
    });
    res.status(200).json(deletedPortfolio);
  } catch (err) {
    err.message = "Portfolio Item not found";
    res.status(500).json(err);
  }
});

module.exports = router;
