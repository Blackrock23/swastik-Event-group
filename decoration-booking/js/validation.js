/* ===== VALIDATION UTILITY ===== */
/* Provides validation functions for the booking system */

const Validation = {
    // Validate email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Validate phone number (basic Indian format)
    isValidPhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone.replace(/[-\s]/g, ''));
    },

    // Validate date (not past date)
    isValidDate(dateString) {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    },

    // Validate form fields
    validateField(fieldName, value) {
        const errors = [];

        switch (fieldName) {
            case 'eventDate':
                if (!value) errors.push('Event date is required');
                else if (!this.isValidDate(value)) errors.push('Event date must be in future');
                break;

            case 'eventType':
                if (!value) errors.push('Event type is required');
                break;

            case 'numberOfGuests':
                if (!value) errors.push('Number of guests is required');
                else if (parseInt(value) < 1) errors.push('Must have at least 1 guest');
                else if (parseInt(value) > 5000) errors.push('Maximum 5000 guests allowed');
                break;

            case 'eventTime':
                if (!value) errors.push('Event time is required');
                break;

            case 'budgetRange':
                if (!value) errors.push('Budget range is required');
                break;

            case 'clientName':
                if (!value) errors.push('Name is required');
                else if (value.trim().length < 2) errors.push('Name must be at least 2 characters');
                break;

            case 'clientPhone':
                if (!value) errors.push('Phone number is required');
                else if (!this.isValidPhone(value)) errors.push('Invalid phone number');
                break;

            case 'clientEmail':
                if (!value) errors.push('Email is required');
                else if (!this.isValidEmail(value)) errors.push('Invalid email address');
                break;

            case 'venueName':
                if (!value) errors.push('Venue name is required');
                break;

            case 'venueAddress':
                if (!value) errors.push('Venue address is required');
                break;

            case 'city':
                if (!value) errors.push('City is required');
                break;

            case 'themeName':
                if (!value) errors.push('Theme name is required');
                break;

            case 'colorPreference':
                if (!value) errors.push('Color preference is required');
                break;
        }

        return errors;
    },

    // Validate booking form
    validateBookingForm(formData) {
        const errors = {};
        const fields = ['eventDate', 'eventType', 'numberOfGuests', 'eventTime', 'budgetRange'];

        fields.forEach(field => {
            const fieldErrors = this.validateField(field, formData[field] || '');
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors[0];
            }
        });

        return errors;
    },

    // Validate client details form
    validateClientDetailsForm(formData) {
        const errors = {};
        const fields = ['clientName', 'clientPhone', 'clientEmail', 'venueName', 'venueAddress', 'city'];

        fields.forEach(field => {
            const fieldErrors = this.validateField(field, formData[field] || '');
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors[0];
            }
        });

        return errors;
    },

    // Validate custom decoration form
    validateCustomDecorationForm(formData) {
        const errors = {};
        const fields = ['themeName', 'colorPreference'];

        fields.forEach(field => {
            const fieldErrors = this.validateField(field, formData[field] || '');
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors[0];
            }
        });

        return errors;
    },

    // Show validation errors in UI
    showErrors(errors, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear previous errors
        container.innerHTML = '';

        Object.entries(errors).forEach(([field, message]) => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-error';
            errorDiv.textContent = message;
            container.appendChild(errorDiv);

            // Highlight the input field
            const inputField = document.querySelector(`[name="${field}"]`);
            if (inputField) {
                inputField.style.borderColor = '#dc3545';
            }
        });
    },

    // Clear field errors
    clearFieldErrors(fieldName) {
        const inputField = document.querySelector(`[name="${fieldName}"]`);
        if (inputField) {
            inputField.style.borderColor = '';
        }
    }
};
