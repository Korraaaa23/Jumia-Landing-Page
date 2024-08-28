// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Select various elements needed for functionality
    const prevBtn = document.querySelector(".prev"); // Button to navigate to the previous product
    const nextBtn = document.querySelector(".next"); // Button to navigate to the next product
    const products = document.querySelectorAll(".product"); // All product elements
    const cartBtn = document.getElementById("cart-toggle-btn"); // Button to toggle the cart modal
    const cartCount = document.getElementById("cart-count"); // Display of the number of items in the cart
    const cartItemsContainer = document.getElementById("cart-items"); // Container for displaying cart items
    const addToCartButtons = document.querySelectorAll(".product button"); // Buttons to add products to cart
    const modal = document.getElementById("cart-modal"); // Cart modal
    const closeBtn = document.querySelector(".close"); // Button to close the cart modal
    const totalAmountDisplay = document.createElement("div"); // Container to display total amount

    // Initialize variables
    let currentIndex = 0; // Index of the currently displayed product
    let cart = []; // Array to store cart items

    // Function to display a specific product and hide others
    function showProduct(index) {
        products[currentIndex].classList.add("hidden");
        products[index].classList.remove("hidden");
        currentIndex = index;
    }

    // Function to update cart modal content, count, and total amount
    function updateCartModal() {
        // Clear existing cart items
        cartItemsContainer.innerHTML = "";
        // Initialize total amount
        let totalAmount = 0;

        // Populate cart modal with current cart items and calculate total amount
        cart.forEach(function(item) {
            const cartItem = document.createElement("div");
            cartItem.textContent = `${item.name} - ${item.price}`;
            cartItemsContainer.appendChild(cartItem);

            // Extract price from item.price (assuming it's in the format "$20.99")
            const price = parseFloat(item.price.replace('$', ''));
            totalAmount += price;
        });

        // Display total amount inside the cart modal
        totalAmountDisplay.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
        cartItemsContainer.appendChild(totalAmountDisplay);

        // Update cart count with total number of items
        cartCount.textContent = cart.length;
    }

    // Event listener for navigating to the previous product
    prevBtn.addEventListener("click", function() {
        if (currentIndex > 0) {
            showProduct(currentIndex - 1);
        }
    });

    // Event listener for navigating to the next product
    nextBtn.addEventListener("click", function() {
        if (currentIndex < products.length - 1) {
            showProduct(currentIndex + 1);
        }
    });

    // Event listeners for each "Add to Cart" button
    addToCartButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            // Get product details
            const product = products[index];
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("p").textContent;

            // Add product to cart
            cart.push({ name: productName, price: productPrice });

            // Update cart modal and count
            updateCartModal();
        });
    });

    // Event listener for opening the cart modal
    cartBtn.addEventListener("click", function() {
        // Update cart modal and count before showing it
        updateCartModal();
        modal.style.display = "block"; // Show modal
    });

    // Event listener for closing the cart modal
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none"; // Hide modal
    });

    // Event listener to close the cart modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide modal
        }
    });
});
