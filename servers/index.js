require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a model for our data
const Subscriber = mongoose.model('Subscriber', new mongoose.Schema({
  email: String,
}));

// Endpoint for subscribing emails
app.post('/subscribe', async (req, res) => {
    console.log("hit api")
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Missing email');
  }
  console.log("received email")

  const subscriber = new Subscriber({ email });
  await subscriber.save();

  res.send('Subscribed successfully');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
