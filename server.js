const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB with increased timeout
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define Checkout Schema
const checkoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  orderDetails: String,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const CheckoutModel = mongoose.model('Checkout', checkoutSchema);

// Endpoint to handle checkout
app.post('/checkout', async (req, res) => {
  const { name, email, address, phone, orderDetails, total } = req.body;

  try {
    // Log the received data for debugging
    console.log('Received checkout data:', { name, email, address, phone, orderDetails, total });

    // Save checkout details to MongoDB
    const checkoutDoc = new CheckoutModel({
      name,
      email,
      address,
      phone,
      orderDetails,
      total,
    });
    await checkoutDoc.save();

    res.status(200).json({ success: true, message: 'Checkout details saved successfully.' });
  } catch (error) {
    console.error('Error saving checkout details:', error); // Log the full error
    res.status(500).json({ success: false, error: 'Failed to process checkout.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
