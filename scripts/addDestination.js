// scripts/addDestination.js

import { destinations as initialDestinations } from '../data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addDestinationForm');
    const destinationCode = document.getElementById('destinationCode');
    const destinationName = document.getElementById('destinationName');
    const airportName = document.getElementById('airportName');
    const airportUrl = document.getElementById('airportUrl');
    const email = document.getElementById('email');
    const imageUrl = document.getElementById('imageUrl');

    // Load existing destinations from sessionStorage if available; otherwise use initialDestinations
    let destinationsList = JSON.parse(sessionStorage.getItem('destinations')) || initialDestinations;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation
        const code = destinationCode.value.trim().toUpperCase();
        const name = destinationName.value.trim();
        const airport = airportName.value.trim();
        const url = airportUrl.value.trim();
        const emailAddress = email.value.trim();
        const image = imageUrl.value.trim();

        // Check for duplicates in destinationsList
        const isDuplicate = destinationsList.some(
            (dest) =>
                dest.destinationCode === code ||
                dest.destinationName.toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) {
            alert('This destination already exists.');
            return;
        }

        // Create new destination object
        const newDestination = {
            destinationCode: code,
            destinationName: name,
            airportName: airport,
            airportUrl: url,
            email: emailAddress,
            imageUrl: image,
        };

        // Add new destination to the list
        destinationsList.push(newDestination);

        // Update sessionStorage with the new destinations list
        sessionStorage.setItem('destinations', JSON.stringify(destinationsList));

        // Show success message with the new destination details
        alert(`Destination added successfully!\n\nDetails:\n${JSON.stringify(newDestination, null, 2)}`);

        form.reset();
    });
});
