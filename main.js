document.addEventListener('DOMContentLoaded', () => {
    let items = {};

    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data;

            const cartItems = document.getElementById('cart').querySelector('tbody');
            const totalPriceElement = document.getElementById('totalPrice');

            function updateCart() {
                let totalPrice = 0;
                cartItems.innerHTML = '';
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        const price = items[item] * quantity;
                        totalPrice += price;
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${item}</td><td>${quantity}</td><td>Rs.${price.toFixed(2)}</td>`;
                        cartItems.appendChild(tr);
                    }
                });
                totalPriceElement.innerText = `Rs. ${totalPrice.toFixed(2)}`;
            }

            function saveFavourites() {
                const favourites = {};
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        favourites[item] = quantity;
                    }
                });
                localStorage.setItem('favourites', JSON.stringify(favourites));
                alert('Added to favorites.');
            }

            function applyFavourites() {
                try {
                    const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
                    Object.keys(favourites).forEach(item => {
                        document.getElementById(item).value = favourites[item];
                    });
                    updateCart();
                } catch (error) {
                    console.error('Error applying favourites:', error);
                }
            }

            function resetCart() {
                Object.keys(items).forEach(item => {
                    document.getElementById(item).value = 0;
                });
                updateCart();
            }

            function buyNow() {
                const cartTable= {};
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        cartTable[item] = quantity;
                    }
                });
                localStorage.setItem('cartTable', JSON.stringify(cartTable));
            }

            document.querySelectorAll('.add-to-cart-button').forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    updateCart();
                });
            });

            document.getElementById('add-to-favourites').addEventListener('click', event => {
                event.preventDefault();
                saveFavourites();
            });

            document.getElementById('apply-favourites').addEventListener('click', event => {
                event.preventDefault();
                applyFavourites();
            });

            document.getElementById('buy-now').addEventListener('click', event => {
                event.preventDefault();
                buyNow();
                window.location.href = 'Order.html';
            });

            document.getElementById('reset-cart').addEventListener('click', event => {
                event.preventDefault();
                resetCart();
            });
        })
        .catch(error => console.error('Error loading items:', error));


        /*

        function updateCartDisplay() {
            const cartDisplay = document.getElementById('cart-display');
            cartDisplay.innerHTML = '';
            for (const item in cart) {
                const quantity = cart[item];
                const listItem = document.createElement('li');
                listItem.textContent = `${item}: ${quantity}`
                cartDisplay.appendChild(listItem);
            }}*/

        
});