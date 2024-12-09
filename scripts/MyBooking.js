// scripts/MyBookings.js

document.addEventListener('DOMContentLoaded', () => {
    const bookings = JSON.parse(sessionStorage.getItem('bookings')) || [];

    // Display the bookings dynamically
    const bookingsListDiv = document.getElementById('bookings-list');

    if (bookings && bookings.length > 0) {
        bookings.forEach((booking) => {
            const bookingCard = document.createElement('div');
            bookingCard.classList.add('booking-card');

              // Use a placeholder image if destinationImage is missing
            const imageUrl = booking.destinationImage || 'https://via.placeholder.com/150';

            bookingCard.innerHTML = `
                  <div class="booking-frame">
                    <!-- Destination Image -->
                             <div class="image-container">
                        <img 
                            src="${booking.destinationImage || 'https://via.placeholder.com/150'}" 
                            alt="Destination Image" 
                            class="destination-image">
                    </div>
                    
                    <!-- Booking Information -->
                    <div class="booking-info">
                        <p><strong>Flight No:</strong> ${booking.flightNo}</p>
                        <p><strong>Origin:</strong> ${booking.origin}</p>
                        <p><strong>Destination:</strong> ${booking.destination}</p>
                        <p><strong>Departure Date & Time:</strong> ${booking.departureDateTime}</p>
                        <p><strong>Landing Date & Time:</strong> ${booking.landingDateTime}</p>
                        <p><strong>Passengers:</strong> ${booking.passengers
                            .map((passenger) => `${passenger.name} (${passenger.id})`)
                            .join(', ')}</p>
                    </div>
                </div>
            `;

            bookingsListDiv.appendChild(bookingCard);
        });
    } else {
        bookingsListDiv.innerHTML = "<p>You have no bookings at the moment.</p>";
    }
});
