const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://n3sphere.github.io', // Allow requests from your frontend
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to process checkout.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
