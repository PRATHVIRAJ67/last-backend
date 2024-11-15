const Contact = require('../models/Contact');

// Create a new contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).send({ error: 'Contact not found' });
    res.send(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).send({ error: 'Contact not found' });
    res.send({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete contact' });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
