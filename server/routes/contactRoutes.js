const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.route("/").get(contactController.getContacts);
router.route("/create").post(contactController.createContact);
router.route("/favorites").get(contactController.getFavorites);
router.route("/search/:searchQuery").get(contactController.getContactBySearchQuery);
router.route("/update/:id").patch(contactController.updateContact);
router.route("/delete/:id").delete(contactController.deleteContact);
router.route("/favorites/:id").post(contactController.toggleFavorites);
router.route("/:id").get(contactController.getContactById);

module.exports = router;
