// Function to render cart items on the cart page
function renderCart() {
  const cartList = document.getElementById('cart-items');
  const totalText = document.getElementById('total');
  const productCount = document.getElementById('product-count');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})" style="margin-left: 10px; color: red;">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    });
  }

  totalText.textContent = `Total: ₹${total}`;
  productCount.textContent = `Total Products: ${cart.length}`;
}

// Function to add items to cart (use on product pages)
function addToCart(productName, price) {
  const item = { name: productName, price: price };
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart for ₹${price}`);
}

// Function to remove item from cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Function to place order (on cart page)
function handleOrder(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  if (!name || !email || !address) {
    alert('Please fill in all fields before placing the order.');
    return;
  }

  alert(`Thank you ${name}! Your order has been placed.\nWe’ll reach out at ${email}.`);
  localStorage.removeItem('cart');
  renderCart();
  document.getElementById('order-form').reset();
}

// Initialize cart rendering when page is loaded
document.addEventListener('DOMContentLoaded', renderCart);
