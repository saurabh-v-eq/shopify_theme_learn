const addButton = document.querySelector(".add-selected-to-cart");
const checkboxes = document.querySelectorAll(".product-check");
// Toggle button visibility based on checkbox state
checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    const ischecked =
      document.querySelectorAll(".product-check:checked").length > 0;
    addButton.style.display = ischecked ? "block" : "none";
  });
});

// Add selected variants to cart
addButton.addEventListener("click", function () {
  const selectedInputs = document.querySelectorAll(".product-check:checked");
  const cartMsg = document.querySelector(".msg");
  const items = [];

  selectedInputs.forEach((input) => {
    items.push({
      id: parseInt(input.dataset.variantId),
      quantity: 1,
    });
  });

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ items: items }),
  })
    .then((response) => response.json())
    .then((data) => {
      addButton.style.display = "none";
      selectedInputs.forEach((cb) => (cb.checked = false));
      cartMsg.textContent = `Successfully added to the cart!`;
      updateCartCount();
    })
    .catch((error) => {
      cartMsg.textContent = `failed to the cart`;
      console.error("Error:", error);
    });
});

function updateCartCount() {
  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => {
      let countBubble = document.querySelector(".cart-count-bubble");

      // If no bubble exists but cart has items, create it
      if (!countBubble && cart.item_count > 0) {
        const cartIcon = document.querySelector("#cart-icon-bubble");
        if (cartIcon) {
          countBubble = document.createElement("div");
          countBubble.classList.add("cart-count-bubble");
          cartIcon.appendChild(countBubble);
        }
      }

      // Update bubble text content
      if (countBubble) {
        let countSpan = countBubble.querySelector('span[aria-hidden="true"]');
        if (!countSpan) {
          countSpan = document.createElement("span");
          countSpan.setAttribute("aria-hidden", "true");
          countBubble.appendChild(countSpan);
        }
        countSpan.textContent = cart.item_count;
      }
    });
}
