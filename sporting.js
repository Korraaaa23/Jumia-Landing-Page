document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartBtn = document.getElementById("cart-toggle-btn");
    const cartCount = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const closeBtn = document.querySelector(".close");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = []; // Array to store cart items

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Function to calculate total price of items in cart
    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price.substring(1)); // Remove "$" sign and convert to float
        });
        return total.toFixed(2); // Round to 2 decimal places
    }

    // Function to update cart modal content and total price
    function updateCartModal() {
        cartItemsContainer.innerHTML = ""; // Clear existing cart items
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.textContent = `${item.name} - ${item.price}`;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotal.textContent = calculateTotal();
    }

    // Add event listeners to Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = this.parentElement;
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("p").textContent;
            cart.push({ name: productName, price: productPrice });
            updateCartCount();
        });
    });

    // Cart button functionality (open cart modal)
    cartBtn.addEventListener("click", function() {
        updateCartModal();
        cartModal.style.display = "block";
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener("click", function() {
        cartModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
});
