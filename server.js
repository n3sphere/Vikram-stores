const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send email with checkout details
async function sendEmail(orderDetails) {
  const { name, email, address, phone, orderDetails: items, total } = orderDetails;

  const msg = {
    to: process.env.OWNER_EMAIL, // Owner's email
    from: process.env.SENDGRID_FROM_EMAIL, // Verified sender email in SendGrid
    subject: 'New Order Received',
    text: `
      New Order Received!

      Customer Details:
      Name: ${name}
      Email: ${email}
      Address: ${address}
      Phone: ${phone}

      Order Details:
      ${items}

      Total: $${total.toFixed(2)}
    `,
  };

  await sgMail.send(msg);
}

// Endpoint to handle checkout
app.post('/checkout', async (req, res) => {
  const { name, email, address, phone, orderDetails, total } = req.body;

  try {
    // Send checkout details to owner's email
    await sendEmail({ name, email, address, phone, orderDetails, total });

    res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error in /checkout:', error); // Log the full error
    res.status(500).json({ success: false, error: 'Failed to process order.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
