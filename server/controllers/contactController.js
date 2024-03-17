const Contact = require("../models/contactModel");

const sortContactsByName = (contacts) => {
  return contacts.sort((a, b) => {
    const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
};

exports.createContact = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new contact and add it to the database -- output => new contact
    await Contact.create(req.body);
    const contacts = await Contact.find({});
    const sortedContacts = sortContactsByName(contacts);
    res.send(sortedContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating the contact");
  }
};

exports.getContacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database -- output => all contacts
    const contacts = await Contact.find({});
    const sortedContacts = sortContactsByName(contacts);
    res.send(sortedContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the contacts");
  }
};

exports.getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.send(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the contact");
  }
};

exports.getContactBySearchQuery = async (req, res) => {
  // Retrieve all contacts that match the search query -- output => afiltered contacts
  const searchQuery = req.params.searchQuery;
  try {
    const filteredContacts = await Contact.find({
      $or: [
        { firstName: { $regex: searchQuery, $options: "i" } }, // 'i' for case-insensitive
        { lastName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { "numbers.number": { $regex: searchQuery, $options: "i" } },
      ],
    });
    if (filteredContacts.length === 0) {
      return res.status(404).send("Contact not found");
    }
    const sortedContacts = sortContactsByName(filteredContacts);
    res.send(sortedContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the contact");
  }
};

exports.updateContact = async (req, res) => {
  //Updates a selected contact -- output => updated contacts
  const contactId = req.params.id;
  const newContact = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      newContact
    );
    if (!updatedContact) {
      return res.status(404).send("Contact not found");
    }
    const updatedContacts = await Contact.find();
    const sortedContacts = sortContactsByName(updatedContacts);
    res.send(sortedContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the contact");
  }
};

exports.deleteContact = async (req, res) => {
  //Deletes a selected contact -- output => updated contacts
  const contactId = req.params.id;
  console.log(contactId);
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).send("Contact not found");
    }
    const updatedContacts = await Contact.find();
    const sortedContacts = sortContactsByName(updatedContacts);
    res.send(sortedContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the contact");
  }
};

exports.getFavorites = async (req, res) => {
  try {
    // Retrieve all favorite contacts from the database -- output => all favorites
    const favorites = await Contact.find({ isFavorite: true });
    const sortedFavorites = sortContactsByName(favorites);
    res.send(sortedFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the favorites");
  }
};

exports.toggleFavorites = async (req, res) => {
  // Toggle the favorites -- output => new favorites
  const contactId = req.params.id;
  console.log(contactId);
  try {
    const toggledContact = await Contact.findById(contactId);
    toggledContact.isFavorite = !toggledContact.isFavorite;
    await toggledContact.save();
    const updatedFavorites = await Contact.find({ isFavorite: true });
    const sortedFavorites = sortContactsByName(updatedFavorites);
    res.send(sortedFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the contact");
  }
};
