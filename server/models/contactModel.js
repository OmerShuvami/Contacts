const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    numbers: [
      {
        type: {
          type: String,
          required: true,
        },
        number: {
          type: String,
          required: true,
        },
      },
    ],
    email: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      // default: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
