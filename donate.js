document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const stripe = Stripe('your_stripe_publishable_key');

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            customAmountInput.value = amount;
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const amount = customAmountInput.value.trim();
        const paymentMethod = document.querySelector('select[name="paymentMethod"]').value;

        if (!name || !email || !amount || !paymentMethod) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        // Submit form data to server
        const formData = new FormData(form);
        try {
            const response = await fetch('donate.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.errors) {
                alert(result.errors.join('\n'));
                return;
            }

            if (result.success) {
                if (paymentMethod === 'creditCard' && result.clientSecret) {
                    // Handle Stripe payment
                    const { error } = await stripe.confirmCardPayment(result.clientSecret, {
                        payment_method: {
                            card: elements.getElement('card'),
                            billing_details: {
                                name: name,
                                email: email
                            }
                        }
                    });

                    if (error) {
                        alert(error.message);
                    } else {
                        // Payment successful, redirect to thank you page
                        window.location.href = 'thank-you.php?amount=' + amount;
                    }
                } else {
                    // For other payment methods, redirect to thank you page
                    window.location.href = 'thank-you.php?amount=' + amount;
                }
            } else {
                alert('An error occurred while processing your donation. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your donation. Please try again later.');
        }
    });
});