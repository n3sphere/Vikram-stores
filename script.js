// Product Data
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description: "Essential white cotton t-shirt with a comfortable fit."
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
    description: "Modern slim fit jeans in dark wash denim."
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    description: "Light and breezy floral dress perfect for summer."
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    description: "Classic black leather jacket with silver hardware."
  },
  {
    id: 5,
    name: "Striped Polo Shirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
    description: "Casual striped polo shirt in cotton blend."
  },
  {
    id: 6,
    name: "Pleated Skirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
    description: "Elegant pleated skirt in a versatile length."
  }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartSidebar = document.getElementById('cartSidebar');
const navLinks = document.getElementById('navLinks');
const checkoutForm = document.getElementById('checkoutForm');

// Toggle Mobile Menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Toggle Cart Sidebar
function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('active');
}
// Close Cart Sidebar when clicking outside
document.addEventListener('click', (event) => {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartIcon = document.querySelector('.cart-icon');

  if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
    cartSidebar.classList.remove('active');
  }
});

// Add to Cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
  alert("Your item is added to the cart");
}

// Update Cart
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button onclick="removeFromCart(${item.id})" id="remove-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#ee0909" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button>
    </div>
  `).join('');

  // Update total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toFixed(2);
}

// Update Quantity
function updateQuantity(id, quantity) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
    updateCart();
  }
}

// Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Render Products
function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Initialize
renderProducts();

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
    }
  });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    alert(`Thank you for subscribing, ${email}!`);
    newsletterForm.reset();
  });
}



/*function sendOrderViaWhatsApp() {
  const name = document.getElementById('checkout-name').value;
  const email = document.getElementById('checkout-email').value;
  const address = document.getElementById('checkout-address').value;
  const phone = document.getElementById('checkout-phone').value;

  const orderDetails = cart
    .map(
      (item) =>
        `${item.name} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}`
    )
    .join('%0A');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = `New Order Received!%0A%0ACustomer Details:%0AName: ${name}%0AEmail: ${email}%0AAddress: ${address}%0APhone: ${phone}%0A%0AOrder Details:%0A${orderDetails}%0A%0ATotal: $${total.toFixed(
    2
  )}`;

  const phoneNumber = "919342901190"; 
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  window.open(whatsappURL, '_blank');

  cart = [];
  updateCart();
  toggleCart();
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendOrderViaWhatsApp();
  });
}
*/
//Whatsapp feature

// Function to handle checkout form submission
if (checkoutForm) {
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = checkoutForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // Collect customer details
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const address = document.getElementById('checkout-address').value;
    const phone = document.getElementById('checkout-phone').value;

    // Collect order details
    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}`
      )
      .join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      // Send data to the backend
      const response = await fetch('https://vikram-stores.onrender.com/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          address,
          phone,
          orderDetails,
          total: total.toFixed(2),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Checkout details saved successfully!');
        // Clear the cart
        cart = [];
        updateCart();
        toggleCart();
      } else {
        alert('Failed to save checkout details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Complete Purchase';
    }
  });
}
// 3D Effect for Category Cards
/*document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.querySelector('.card-3d').style.transform = 
      `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-3d').style.transform = 
      'rotateX(0) rotateY(0)';
  });
});*/

// Add event listener for checkout form
