/* ===== CUSTOM DECORATION PAGE LOGIC ===== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customDecorationForm');
    const errorMessagesDiv = document.getElementById('errorMessages');

    const CUSTOM_DECOR_PRICE = 35000;

    // Load existing data if available
    loadExistingData();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        errorMessagesDiv.innerHTML = '';

        // Get selected items
        const selectedItems = [];
        document.querySelectorAll('input[name="decorationItems"]:checked').forEach(checkbox => {
            selectedItems.push(checkbox.value);
        });

        // Get form data
        const formData = {
            themeName: document.getElementById('themeName').value,
            colorPreference: document.getElementById('colorPreference').value,
            decorationItems: selectedItems,
            referenceUrl: document.getElementById('referenceUrl').value,
            customNotes: document.getElementById('customNotes').value
        };

        // Validate form
        const errors = {};

        if (!formData.themeName.trim()) {
            errors.themeName = 'Theme name is required';
        }

        if (!formData.colorPreference.trim()) {
            errors.colorPreference = 'Color preference is required';
        }

        if (selectedItems.length === 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-error';
            errorDiv.textContent = 'Please select at least one decoration item';
            errorMessagesDiv.appendChild(errorDiv);
            return;
        }

        if (Object.keys(errors).length > 0) {
            Validation.showErrors(errors, 'errorMessages');
            return;
        }

        // Save to localStorage
        Storage.updateBooking({
            customDecor: formData,
            decorationType: 'custom',
            selectedDecor: {
                name: formData.themeName,
                price: CUSTOM_DECOR_PRICE,
                description: `Custom design with ${formData.colorPreference}`,
                type: 'custom'
            },
            decorationPrice: CUSTOM_DECOR_PRICE
        });

        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = 'Custom decoration design saved! Redirecting to booking summary...';
        errorMessagesDiv.appendChild(successDiv);

        // Redirect to client details
        setTimeout(() => {
            window.location.href = 'client-details.html';
        }, 1500);
    });

    // Real-time field saving
    form.addEventListener('change', function(e) {
        if (e.target.name === 'themeName' || e.target.name === 'colorPreference') {
            Validation.clearFieldErrors(e.target.name);
        }
    });

    form.addEventListener('input', function(e) {
        if (e.target.name === 'themeName' || e.target.name === 'colorPreference') {
            // Save field to localStorage
        }
    });

    // Function to load existing data
    function loadExistingData() {
        const booking = Storage.getBooking();

        if (booking.customDecor) {
            const custom = booking.customDecor;
            document.getElementById('themeName').value = custom.themeName || '';
            document.getElementById('colorPreference').value = custom.colorPreference || '';
            document.getElementById('referenceUrl').value = custom.referenceUrl || '';
            document.getElementById('customNotes').value = custom.customNotes || '';

            // Check the items
            if (custom.decorationItems && Array.isArray(custom.decorationItems)) {
                custom.decorationItems.forEach(item => {
                    const checkbox = document.querySelector(`input[value="${item}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
        }
    }
});
