// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Select various elements needed for functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart"); // Buttons to add products to cart
    const cartBtn = document.getElementById("cart-toggle-btn"); // Button to toggle the cart modal
    const cartCount = document.getElementById("cart-count"); // Display of the number of items in the cart
    const cartModal = document.getElementById("cart-modal"); // Cart modal
    const closeBtn = document.querySelector(".close"); // Button to close the cart modal
    const cartItemsContainer = document.getElementById("cart-items"); // Container for displaying cart items
    const cartTotal = document.getElementById("cart-total"); // Display of the total price of items in the cart
    const productNames = document.querySelectorAll(".product h3"); // Select all product names

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
            // Get product details
            const product = this.parentElement;
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("p").textContent;

            // Add product to cart
            cart.push({ name: productName, price: productPrice });

            // Update cart count
            updateCartCount();
        });
    });

    // Cart button functionality (open cart modal)
    cartBtn.addEventListener("click", function() {
        // Update cart modal and count before showing it
        updateCartModal();
        cartModal.style.display = "block"; // Show modal
    });

    // Event listener for closing the cart modal
    closeBtn.addEventListener("click", function() {
        cartModal.style.display = "none"; // Hide modal
    });

    // Event listener to close the cart modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none"; // Hide modal
        }
    });

    // Add event listeners to product names to redirect to a common link
    productNames.forEach(name => {
        name.addEventListener("click", function() {
            window.location.href = "proddet.html"; // Replace "proddet.html" with your desired link
        });
    });
});
