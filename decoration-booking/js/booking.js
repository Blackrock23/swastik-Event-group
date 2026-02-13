/* ===== BOOKING PAGE LOGIC ===== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const errorMessagesDiv = document.getElementById('errorMessages');

    // Load existing data if available
    loadExistingData();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        errorMessagesDiv.innerHTML = '';

        // Get form data
        const formData = {
            eventDate: document.getElementById('eventDate').value,
            eventType: document.getElementById('eventType').value,
            numberOfGuests: document.getElementById('numberOfGuests').value,
            eventTime: document.getElementById('eventTime').value,
            budgetRange: document.getElementById('budgetRange').value,
            notes: document.getElementById('notes').value
        };

        // Validate form
        const errors = Validation.validateBookingForm(formData);

        if (Object.keys(errors).length > 0) {
            // Show errors
            Validation.showErrors(errors, 'errorMessages');
            return;
        }

        // Save to localStorage
        Storage.updateBooking(formData);

        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = 'Event details saved! Redirecting to decoration selection...';
        errorMessagesDiv.appendChild(successDiv);

        // Redirect to decoration selection
        setTimeout(() => {
            window.location.href = 'decor-selection.html';
        }, 1500);
    });

    // Real-time validation on field change
    form.addEventListener('change', function(e) {
        if (e.target.name) {
            Validation.clearFieldErrors(e.target.name);
            const errors = Validation.validateField(e.target.name, e.target.value);
            
            if (errors.length > 0) {
                e.target.style.borderColor = '#dc3545';
            }

            // Save field to localStorage as user types
            Storage.set(e.target.name, e.target.value);
        }
    });

    // Save on input (for text fields)
    form.addEventListener('input', function(e) {
        if (e.target.name && (e.target.type === 'text' || e.target.type === 'number')) {
            Storage.set(e.target.name, e.target.value);
        }
    });

    // Function to load existing data
    function loadExistingData() {
        const booking = Storage.getBooking();

        if (booking.eventDate) document.getElementById('eventDate').value = booking.eventDate;
        if (booking.eventType) document.getElementById('eventType').value = booking.eventType;
        if (booking.numberOfGuests) document.getElementById('numberOfGuests').value = booking.numberOfGuests;
        if (booking.eventTime) document.getElementById('eventTime').value = booking.eventTime;
        if (booking.budgetRange) document.getElementById('budgetRange').value = booking.budgetRange;
        if (booking.notes) document.getElementById('notes').value = booking.notes;
    }
});
