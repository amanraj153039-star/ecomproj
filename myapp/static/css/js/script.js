// ================================
// My Store - script.js
// ================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("My Store Loaded Successfully!");

    // Welcome Alert
    setTimeout(function () {
        console.log("Welcome to My Store");
    }, 1000);

    // Product Card Hover Effect
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-10px)";
            card.style.transition = "0.3s";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0px)";
        });

    });

    // Add to Cart Button
    const cartButtons = document.querySelectorAll(".add-cart");

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert("✅ Product Added to Cart!");

        });

    });

    // Buy Now Button
    const buyButtons = document.querySelectorAll(".buy-now");

    buyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert("🛒 Redirecting to Checkout...");

        });

    });

    // Back to Top Button
    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                topBtn.style.display = "block";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});

// Current Year in Footer
const year = document.getElementById("year");

if (year) {

    year.innerHTML = new Date().getFullYear();

}

// Get DOM references
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');

// Prevent default anchor jump behavior and open drawer
cartBtn.addEventListener('click', function(e) {
  e.preventDefault(); 
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
});

// Close drawer actions
function closeDrawer() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
}

closeCartBtn.addEventListener('click', closeDrawer);
cartOverlay.addEventListener('click', closeDrawer);

// Function to safely grab Django's CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Attach event listeners to all "Add Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        const csrftoken = getCookie('csrftoken');

        // Send Ajax request to Django view
        fetch('/add-to-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ 'product_id': productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Product added to cart!');
                // Optional: Update a counter element in your navbar 
                // document.getElementById('cart-count').innerText = data.total_items;
            } else {
                alert('Something went wrong.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
// Attach event listeners to all "Add Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // 🛑 Stop the browser from adding '#' to the URL or reloading
        e.preventDefault(); 

        const productId = this.dataset.id;
        const csrftoken = getCookie('csrftoken');

        // Send AJAX request to your Django view
        fetch('/add-to-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ 'product_id': productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Product successfully added to cart!');
            } else {
                alert('Failed to add product: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Check browser console.');
        });
    });
});