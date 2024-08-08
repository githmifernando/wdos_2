document.addEventListener('DOMContentLoaded', () => {
    let items = {};

    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data;

            const cartItems = document.querySelector('#cart tbody');
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

            const cartTable = JSON.parse(localStorage.getItem('cartTable'));
            if (cartTable && cartTable.length > 0) {
                updateCart();
            } else {
                cartItems.innerHTML = '<tr><td colspan="3">No items in cart</td></tr>';
                totalPriceElement.textContent = 'Rs. 0.00';
            }

            function validateForm() {
                const inputs = document.getElementById('orderForm').querySelectorAll('input[required]');
                for (let input of inputs) {
                    if (!input.value.trim()) {
                        return false;
                    }
                }
                return true;
            }
            
            document.getElementById('payButton').addEventListener('click', function (event) {
                event.preventDefault();
                if (validateForm()) {
                    const deliveryDate = new Date();
                    deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming delivery is in 7 days
                    const formattedDeliveryDate = deliveryDate.toDateString();
                    
                    alert('Thank you for your purchase! Your items will be delivered on ' + formattedDeliveryDate + '.');
                } else {
                    alert('Please fill out all required fields.');
                } 
            });

          
            
        })
    }
);

