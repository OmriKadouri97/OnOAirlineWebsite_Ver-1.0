// scripts/manage-destinations.js

import { destinations } from '../data/data.js';

function renderDestinations() {
    const destinationList = document.getElementById('destination-list');
    destinationList.innerHTML = ''; // Clear existing rows

    destinations.forEach((destination) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${destination.destinationCode}</td>
            <td><a href="../pages/AddDestination.html?code=${destination.destinationCode}">${destination.destinationName}</a></td>
            <td>${destination.airportName}</td>
            <td><a href="${destination.airportUrl}" target="_blank">${destination.airportUrl}</a></td>
            <td>${destination.email}</td>
            <td><img src="${destination.imageUrl}" alt="${destination.destinationName}"></td>
        `;

        destinationList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', renderDestinations);
