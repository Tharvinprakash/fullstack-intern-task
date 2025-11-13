const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get("/", templateController.getAllTemplates); 
router.get("/:id", templateController.getTemplateById); 
router.get("/category/:name", templateController.getTemplatesByCategory);

module.exports = router;