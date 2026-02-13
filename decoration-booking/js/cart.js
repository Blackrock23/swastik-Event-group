/* ===== CART PAGE LOGIC ===== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const errorMessagesDiv = document.getElementById('errorMessages');
    const successModal = document.getElementById('successModal');
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');

    // Load data and populate summary
    loadSummary();

    // Payment method change
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            showPaymentSection(this.value);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        errorMessagesDiv.innerHTML = '';

        // Validate terms
        if (!document.getElementById('terms').checked) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-error';
            errorDiv.textContent = 'Please accept the terms and conditions to proceed';
            errorMessagesDiv.appendChild(errorDiv);
            return;
        }

        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        // Validate based on payment method
        let isValid = true;
        const errors = {};

        switch (paymentMethod) {
            case 'credit-card':
                if (!document.getElementById('cardName').value.trim()) {
                    errors.cardName = 'Cardholder name is required';
                    isValid = false;
                }
                if (!validateCardNumber(document.getElementById('cardNumber').value)) {
                    errors.cardNumber = 'Invalid card number';
                    isValid = false;
                }
                if (!validateExpiry(document.getElementById('expiry').value)) {
                    errors.expiry = 'Invalid expiry date (MM/YY)';
                    isValid = false;
                }
                if (!document.getElementById('cvv').value.match(/^\d{3,4}$/)) {
                    errors.cvv = 'Invalid CVV';
                    isValid = false;
                }
                break;

            case 'upi':
                if (!validateUPI(document.getElementById('upiId').value)) {
                    errors.upiId = 'Invalid UPI ID';
                    isValid = false;
                }
                break;

            case 'bank-transfer':
                if (!document.getElementById('transactionId').value.trim()) {
                    errors.transactionId = 'Transaction reference ID is required';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            Object.entries(errors).forEach(([key, message]) => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-error';
                errorDiv.textContent = message;
                errorMessagesDiv.appendChild(errorDiv);
            });
            return;
        }

        // Save booking as complete
        const booking = Storage.getBooking();
        booking.paymentMethod = paymentMethod;
        booking.paymentStatus = 'completed';
        booking.bookingStatus = 'confirmed';
        booking.completedAt = new Date().toISOString();
        Storage.saveBooking(booking);

        // Show success modal
        successModal.classList.add('active');

        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    });

    // Function to show payment section
    function showPaymentSection(method) {
        document.getElementById('cardSection').style.display = 'none';
        document.getElementById('upiSection').style.display = 'none';
        document.getElementById('bankSection').style.display = 'none';
        document.getElementById('installmentSection').style.display = 'none';

        switch (method) {
            case 'credit-card':
                document.getElementById('cardSection').style.display = 'block';
                break;
            case 'upi':
                document.getElementById('upiSection').style.display = 'block';
                break;
            case 'bank-transfer':
                document.getElementById('bankSection').style.display = 'block';
                break;
            case 'installment':
                document.getElementById('installmentSection').style.display = 'block';
                break;
        }
    }

    // Function to load and display summary
    function loadSummary() {
        const booking = Storage.getBooking();

        // Event details
        document.getElementById('summaryEventType').textContent = booking.eventType || '-';
        document.getElementById('summaryDate').textContent = booking.eventDate ? 
            new Date(booking.eventDate).toLocaleDateString() : '-';
        document.getElementById('summaryTime').textContent = booking.eventTime || '-';
        document.getElementById('summaryGuests').textContent = booking.numberOfGuests ? 
            `${booking.numberOfGuests} guests` : '-';
        document.getElementById('summaryCity').textContent = booking.city || '-';

        // Decoration
        document.getElementById('summaryDecor').textContent = booking.selectedDecor ? 
            booking.selectedDecor.name : '-';

        // Pricing
        const total = booking.decorationPrice || 0;
        document.getElementById('summaryDecoPrice').textContent = `₹${total.toLocaleString()}`;
        document.getElementById('totalAmount').textContent = `₹${total.toLocaleString()}`;
        document.getElementById('finalAmount').textContent = `₹${total.toLocaleString()}`;

        // Client info
        document.getElementById('summaryName').textContent = booking.clientName || '-';
        document.getElementById('summaryEmail').textContent = booking.clientEmail || '-';
        document.getElementById('summaryPhone').textContent = booking.clientPhone || '-';
    }

    // Validation functions
    function validateCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.match(/^\d{13,19}$/);
    }

    function validateExpiry(expiry) {
        return expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
    }

    function validateUPI(upi) {
        return upi.match(/^[\w\.\-]+@[\w\.\-]+$/);
    }

    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i += 4) {
            formattedValue += value.substr(i, 4) + ' ';
        }
        e.target.value = formattedValue.trim();
    });

    // Expiry date formatting
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substr(0, 2) + '/' + value.substr(2, 2);
        }
        e.target.value = value;
    });
});
