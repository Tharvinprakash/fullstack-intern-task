const express = require("express");
const router = express.Router();

const favouriteController = require("../controllers/favouriteController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/:templateId",verifyToken,favouriteController.addFavourite);
router.get("/",verifyToken,favouriteController.getFavourites);

module.exports = router;

