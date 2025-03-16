// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Endpoint to send WhatsApp message
app.post('/send-whatsapp', async (req, res) => {
  const { name, email, address, phone, orderDetails, total } = req.body;

  // Prepare the message
  const message = `New Order Received!\n\nCustomer Details:\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPhone: ${phone}\n\nOrder Details:\n${orderDetails}\n\nTotal: $${total}`;

  // Replace with the owner's WhatsApp number
  const ownerWhatsAppNumber = process.env.OWNER_WHATSAPP_NUMBER;

  // Generate WhatsApp Click to Chat URL
  const whatsappURL = `https://api.whatsapp.com/send?phone=${ownerWhatsAppNumber}&text=${encodeURIComponent(
    message
  )}`;

  try {
    // Send the WhatsApp message
    await axios.get(whatsappURL);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));