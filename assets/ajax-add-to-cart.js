document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function(){
        const handle = this.getAttribute('data-handle');
        const messageBox = this.nextElementSibling;

        fetch(`/product/${handle}.js`)
            .then(res => res.json())
            .then(product => {
                const variantID = product.variants[0].id
            })
    })
})