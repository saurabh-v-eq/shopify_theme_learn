document.querySelectorAll('.collection-cart-btn').forEach((button) => {
    button.addEventListener('click', function () {
      const variantId = this.getAttribute('data-variant');
      const getQuantity = this.closest('.collection-cart').querySelector('.input-field').value;
      const messageBox = this.nextElementSibling;

      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: parseInt(getQuantity)
        }),
      })
        .then((res) => res.json())
        .then((product) => {
          messageBox.innerHTML = `<strong>${product.title}</strong> added to cart`;
          updateCartCount();
        })
        .catch((error) => {
          messageBox.innerText = 'Error adding to cart';
          console.error('Add to cart failed:', error);
        });
    });
  });

  function updateCartCount() {
    fetch('/cart.js')
      .then((res) => res.json())
      .then((cart) => {
        let countBubble = document.querySelector('.cart-count-bubble');
  
        if (!countBubble && cart.item_count > 0) {
          const cartIcon = document.querySelector('#cart-icon-bubble');
          if (cartIcon) {
            countBubble = document.createElement('div');
            countBubble.classList.add('cart-count-bubble');
            cartIcon.appendChild(countBubble);
          }
        }
  
        if (countBubble) {
          let countSpan = countBubble.querySelector('span[aria-hidden="true"]');
          if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.setAttribute('aria-hidden', 'true');
            countBubble.appendChild(countSpan);
          }
          countSpan.textContent = cart.item_count;
        }
      });
  }

  document.querySelectorAll('.collection-cart').forEach(cart => {
    const plusBtn = cart.querySelector('.plus');
    const minusBtn = cart.querySelector('.minus');
    const inputField = cart.querySelector('.input-field');
  
    plusBtn.addEventListener('click', () => {
      console.log('Plus clicked');
      let currentValue = parseInt(inputField.value) || 1;
      inputField.value = currentValue + 1;
    });
  
    minusBtn.addEventListener('click', () => {
      let currentValue = parseInt(inputField.value) || 1;
      if (currentValue > 1) {
        inputField.value = currentValue - 1;
      }
    });
  });