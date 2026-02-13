/* ===== STORAGE UTILITY ===== */
/* Manages localStorage for the booking system */

const Storage = {
    // Key for storing all booking data
    BOOKING_KEY: 'swastik_booking_data',

    // Get all booking data
    getBooking() {
        const data = localStorage.getItem(this.BOOKING_KEY);
        return data ? JSON.parse(data) : this.getEmptyBooking();
    },

    // Get empty booking structure
    getEmptyBooking() {
        return {
            // Event details
            eventDate: '',
            eventType: '',
            numberOfGuests: '',
            eventTime: '',
            budgetRange: '',
            notes: '',

            // Decoration choice
            decorationType: 'ready-made', // 'ready-made' or 'custom'
            selectedDecor: null,
            customDecor: null,

            // Client details
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            venueName: '',
            venueAddress: '',
            city: '',

            // Pricing
            eventPackagePrice: 0,
            decorationPrice: 0,
            totalPrice: 0,

            // Timestamps
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    },

    // Save booking data
    saveBooking(data) {
        data.updatedAt = new Date().toISOString();
        localStorage.setItem(this.BOOKING_KEY, JSON.stringify(data));
    },

    // Update booking data (partial update)
    updateBooking(updates) {
        const booking = this.getBooking();
        const updated = { ...booking, ...updates };
        this.saveBooking(updated);
        return updated;
    },

    // Get specific booking field
    get(field) {
        const booking = this.getBooking();
        return booking[field] || null;
    },

    // Set specific booking field
    set(field, value) {
        const booking = this.getBooking();
        booking[field] = value;
        this.saveBooking(booking);
    },

    // Clear all booking data
    clear() {
        localStorage.removeItem(this.BOOKING_KEY);
    },

    // Clear specific field
    clearField(field) {
        const booking = this.getBooking();
        booking[field] = this.getEmptyBooking()[field];
        this.saveBooking(booking);
    },

    // Check if booking is complete
    isComplete() {
        const booking = this.getBooking();
        return (
            booking.eventDate &&
            booking.eventType &&
            booking.numberOfGuests &&
            booking.eventTime &&
            booking.budgetRange &&
            booking.selectedDecor &&
            booking.clientName &&
            booking.clientPhone &&
            booking.clientEmail &&
            booking.venueName &&
            booking.venueAddress &&
            booking.city
        );
    }
};
