// scripts/FlightSearch.js

import { flights as initialFlights, destinations as initialDestinations } from '../data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flight-search-form');
    const resultsTableBody = document.getElementById('results-table-body');
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');

    // Load or initialize data in sessionStorage
    let storedFlights = JSON.parse(sessionStorage.getItem('flights')) || initialFlights;
    let storedDestinations = JSON.parse(sessionStorage.getItem('destinations')) || initialDestinations;

    // If not present in sessionStorage, set them now
    if (!sessionStorage.getItem('flights')) {
        sessionStorage.setItem('flights', JSON.stringify(storedFlights));
    }
    if (!sessionStorage.getItem('destinations')) {
        sessionStorage.setItem('destinations', JSON.stringify(storedDestinations));
    }

    // Populate origin and destination selects from sessionStorage data
    storedFlights = JSON.parse(sessionStorage.getItem('flights'));
    storedDestinations = JSON.parse(sessionStorage.getItem('destinations'));

    populateOriginSelect(storedFlights, originSelect);
    populateDestinationSelect(storedDestinations, destinationSelect);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const origin = originSelect.value.trim();
        const destination = destinationSelect.value.trim();

        resultsTableBody.innerHTML = ''; // Clear previous results

        const filteredFlights = storedFlights.filter(
            (flight) =>
                (origin === '' || flight.origin === origin) &&
                (destination === '' || flight.destination === destination)
        );

        if (filteredFlights.length > 0) {
            filteredFlights.forEach((flight) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${flight.flightNo}</td>
                    <td>${flight.originName ? flight.originName : flight.origin}</td>
                    <td>${getDestinationName(flight.destination, storedDestinations)}</td>
                    <td>${flight.departureDateTime}</td>
                    <td>${flight.landingDateTime}</td>
                    <td>${flight.seatsAvailable}</td>
                    <td><button class="btn book-btn" data-flight-id="${flight.flightNo}">Book</button></td>
                `;
                resultsTableBody.appendChild(row);
            });

            // Attach event listeners to all Book buttons
            document.querySelectorAll('.book-btn').forEach((button) => {
                button.addEventListener('click', (event) => {
                    const flightNo = event.target.getAttribute('data-flight-id');
                    bookFlight(flightNo);
                });
            });
        } else {
            resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7">No flights found matching your criteria.</td>
                </tr>
            `;
        }
    });

    function bookFlight(flightNo) {
        const selectedFlight = storedFlights.find((flight) => flight.flightNo === flightNo);
        if (selectedFlight) {
            // Store flight data in sessionStorage
            sessionStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
            window.location.href = 'OrderFlight.html';
        } else {
            alert('Flight not found. Please try again.');
        }
    }

    function populateOriginSelect(flights, selectElement) {
        // Extract unique origins with their associated originName or fallback to the code
        const uniqueOrigins = [...new Set(flights.map((f) => f.origin))].map((originCode) => {
            const flight = flights.find((f) => f.origin === originCode && f.originName);
            return {
                code: originCode,
                name: flight && flight.originName ? flight.originName : originCode,
            };
        });

        // Create the default option
        selectElement.innerHTML = '<option value="">Select Origin</option>';

        uniqueOrigins.forEach((originObj) => {
            const option = document.createElement('option');
            option.value = originObj.code;
            option.textContent = originObj.name;
            selectElement.appendChild(option);
        });
    }

    function populateDestinationSelect(destinations, selectElement) {
        // Use the destinations array to populate the dropdown
        selectElement.innerHTML = '<option value="">Select Destination</option>';

        destinations.forEach((dest) => {
            const option = document.createElement('option');
            option.value = dest.destinationCode;
            option.textContent = dest.destinationName;
            selectElement.appendChild(option);
        });
    }

    function getDestinationName(code, destinationsList) {
        const dest = destinationsList.find((d) => d.destinationCode === code);
        return dest ? dest.destinationName : code;
    }

});
