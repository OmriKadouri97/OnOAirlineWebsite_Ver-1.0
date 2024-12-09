// scripts/manage-flights.js

import { flights } from '../data/data.js';

function renderFlights() {
    const flightList = document.getElementById('flight-list');
    flightList.innerHTML = ''; // Clear existing rows

    flights.forEach((flight) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${flight.flightNo}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.departureDateTime}</td>
            <td>${flight.landingDateTime}</td>
            <td>${flight.seatsAvailable}</td>
        `;

        flightList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', renderFlights);
