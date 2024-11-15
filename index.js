require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('Database connection error:', err));

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phoneNumber: { type: String, required: true, unique: true },
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
// Create a new contact
app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
});

// Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
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
});

// Delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).send({ error: 'Contact not found' });
    res.send({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete contact' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
