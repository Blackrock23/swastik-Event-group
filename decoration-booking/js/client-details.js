/* ===== CLIENT DETAILS PAGE LOGIC ===== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientDetailsForm');
    const errorMessagesDiv = document.getElementById('errorMessages');

    // Load existing data and populate summary
    loadExistingData();
    updateSummary();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        errorMessagesDiv.innerHTML = '';

        // Get form data
        const formData = {
            clientName: document.getElementById('clientName').value,
            clientPhone: document.getElementById('clientPhone').value,
            clientEmail: document.getElementById('clientEmail').value,
            venueName: document.getElementById('venueName').value,
            venueAddress: document.getElementById('venueAddress').value,
            city: document.getElementById('city').value
        };

        // Validate form
        const errors = Validation.validateClientDetailsForm(formData);

        if (Object.keys(errors).length > 0) {
            Validation.showErrors(errors, 'errorMessages');
            return;
        }

        // Save to localStorage
        Storage.updateBooking(formData);

        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = 'Details saved! Proceeding to payment...';
        errorMessagesDiv.appendChild(successDiv);

        // Redirect to payment/cart
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1500);
    });

    // Real-time field saving
    form.addEventListener('change', function(e) {
        if (e.target.name) {
            Validation.clearFieldErrors(e.target.name);
            Storage.set(e.target.name, e.target.value);
        }
    });

    form.addEventListener('input', function(e) {
        if (e.target.name) {
            Storage.set(e.target.name, e.target.value);
        }
    });

    // Function to load existing data
    function loadExistingData() {
        const booking = Storage.getBooking();

        if (booking.clientName) document.getElementById('clientName').value = booking.clientName;
        if (booking.clientPhone) document.getElementById('clientPhone').value = booking.clientPhone;
        if (booking.clientEmail) document.getElementById('clientEmail').value = booking.clientEmail;
        if (booking.venueName) document.getElementById('venueName').value = booking.venueName;
        if (booking.venueAddress) document.getElementById('venueAddress').value = booking.venueAddress;
        if (booking.city) document.getElementById('city').value = booking.city;
    }

    // Function to update summary
    function updateSummary() {
        const booking = Storage.getBooking();

        // Event details
        document.getElementById('summaryEventType').textContent = booking.eventType || '-';
        
        const dateTime = booking.eventDate ? 
            `${new Date(booking.eventDate).toLocaleDateString()} at ${booking.eventTime || ''}` : '-';
        document.getElementById('summaryDate').textContent = dateTime;
        
        document.getElementById('summaryGuests').textContent = booking.numberOfGuests ? 
            `${booking.numberOfGuests} guests` : '-';
        
        document.getElementById('summaryBudget').textContent = booking.budgetRange || '-';

        // Decoration details
        const decorName = booking.selectedDecor ? booking.selectedDecor.name : '-';
        document.getElementById('summaryDecor').textContent = decorName;

        // Pricing
        const decorPrice = booking.decorationPrice || 0;
        document.getElementById('summaryDecoPrice').textContent = `₹${decorPrice.toLocaleString()}`;

        const total = decorPrice;
        document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString()}`;

        // Save total to booking
        Storage.set('totalPrice', total);
    }
});
