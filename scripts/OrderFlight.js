// scripts/OrderFlight.js

import { destinations } from '../data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const flightDetails = JSON.parse(sessionStorage.getItem('selectedFlight'));
    const flightInfoElement = document.getElementById('flight-info');
    const passengerForm = document.getElementById('passenger-form');
    const passengerFieldsContainer = document.getElementById('passenger-fields');
    const generateFieldsButton = document.getElementById('generate-fields');
    const numPassengersInput = document.getElementById('num-passengers');

    if (flightDetails) {
        flightInfoElement.innerHTML = `
            <strong>Flight No:</strong> ${flightDetails.flightNo}<br>
            <strong>Origin:</strong> ${flightDetails.origin}<br>
            <strong>Destination:</strong> ${flightDetails.destination}<br>
            <strong>Departure:</strong> ${flightDetails.departureDateTime}<br>
            <strong>Landing:</strong> ${flightDetails.landingDateTime}<br>
            <strong>Seats Available:</strong> ${flightDetails.seatsAvailable}
        `;
    } else {
        flightInfoElement.textContent = 'No flight details available.';
    }

    // Generate passenger input fields
    generateFieldsButton.addEventListener('click', () => {
        const numPassengers = parseInt(numPassengersInput.value, 10);

        if (isNaN(numPassengers) || numPassengers < 1 || numPassengers > 10) {
            alert('Please enter a valid number of passengers (1-10).');
            return;
        }

        passengerFieldsContainer.innerHTML = ''; // Clear previous fields

        for (let i = 1; i <= numPassengers; i++) {
            const passengerDiv = document.createElement('div');
            passengerDiv.classList.add('passenger-field');

            passengerDiv.innerHTML = `
                <label for="passenger-name-${i}">Passenger ${i} Name:</label>
                <input type="text" id="passenger-name-${i}" name="passenger-name-${i}" required>
                <label for="passenger-id-${i}">Passenger ${i} ID:</label>
                <input type="text" id="passenger-id-${i}" name="passenger-id-${i}" required>
            `;

            passengerFieldsContainer.appendChild(passengerDiv);
        }
          // Lock the number of passengers field
          numPassengersInput.disabled = true;
    });

    // Handle form submission
    passengerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(passengerForm);
        const passengers = [];
        const numPassengers = parseInt(numPassengersInput.value, 10);
        const passengerIDs = new Set();

        let valid = true;

        for (let i = 1; i <= numPassengers; i++) {
            const name = formData.get(`passenger-name-${i}`).trim();
            const id = formData.get(`passenger-id-${i}`).trim();

            if (passengerIDs.has(id)) {
                alert(`Duplicate ID detected for Passenger ${i}: ${id}`);
                valid = false;
                break;
            } else {
                passengerIDs.add(id);
                passengers.push({ name, id });
            }
        }

        if (valid) {
            
               // Find the destination image URL based on the flight's destination
               const destinationData = destinations.find(dest => dest.destinationCode === flightDetails.destination);
               const destinationImage = destinationData ? destinationData.imageUrl : '';
   
            const bookingDetails = {
                ...flightDetails,
                passengers,
                destinationImage,
            };

            let bookings = JSON.parse(sessionStorage.getItem('bookings')) || [];
            bookings.push(bookingDetails);

            sessionStorage.setItem('bookings', JSON.stringify(bookings));
            alert('Booking saved successfully!');
            window.location.href = 'MyBookings.html';
        }
    });
});
