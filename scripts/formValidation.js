
import {validateTimeFormat,validateDateTimeInFuture,validateDate,validateDifferentLocations,displayError,hideError,validateFlightNumber, validateDateRange, validateSeatCount, validateArrivalAfterDeparture} from './validation.js';


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addFlightForm');
    const flightNo = document.getElementById('flightNo');
    const origin = document.getElementById('origin');
    const destination = document.getElementById('destination');
    const boardingDate = document.getElementById('boardingDate');
    const boardingTime = document.getElementById('boardingTime');
    const arrivalDate = document.getElementById('arrivalDate');
    const arrivalTime = document.getElementById('arrivalTime');
    const seats = document.getElementById('seats');

    // Similar event listeners for other fields...
    flightNo.addEventListener('input', validateFlightNo);
    origin.addEventListener('input', validateLocations);
    destination.addEventListener('input', validateLocations);
    boardingDate.addEventListener('change', validateDatesAndTimes);
    boardingTime.addEventListener('input', validateDatesAndTimes);
    arrivalDate.addEventListener('change', validateDatesAndTimes);
    arrivalTime.addEventListener('input', validateDatesAndTimes);
    seats.addEventListener('input', validateSeatCount);


    // All validations passed, proceed to add flight
    const flights = JSON.parse(sessionStorage.getItem('flights')) || [];

     // Real-time validation for the flight number
     flightNo.addEventListener('input', () => {
        if (!validateFlightNumber(flightNo.value)) {
            displayError('flightNoError', 'Flight number must be 2 uppercase letters followed by 4 digits.');
        } else if (isDuplicateFlightNumber(flightNo.value.trim())) {
            displayError('flightNoError', 'This flight number already exists. Please choose another one.');
        } else {
            hideError('flightNoError');
        }
    });

  // Real-time validation for the seats input field
  seats.addEventListener('input', () => {
    if (!validateSeatCount(seats.value)) {
        displayError('seatsError', 'Number of seats must be between 1 and 850.');
    } else {
        hideError('seatsError');
    }
});

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
       
        const isValid =
        validateFlightNo() &&
        validateLocations() &&
        validateDatesAndTimes() &&
        validateSeats();

        if (isValid) {

        // If valid, add the flight to data
        flights.push({
            flightNo: flightNo.value.trim(),
            origin: origin.value.trim(),
            destination: destination.value.trim(),
            departureDateTime: `${boardingDate.value} ${boardingTime.value}`,
            landingDateTime: `${arrivalDate.value} ${arrivalTime.value}`,
            seatsAvailable: parseInt(seats.value, 10),
        });

        sessionStorage.setItem('flights', JSON.stringify(flights));
       
            // Alert the new flight object
        alert(`Flight added successfully!\n\n${JSON.stringify(flights, null, 2)}`);

            form.reset();
            window.location.href = '../pages/ManageFlights.html';
        } else {
            alert('Please correct the errors in the form.');
        }
    });


    function validateFlightNo() {
        if (!validateFlightNumber(flightNo.value)) {
            displayError('flightNoError', 'Flight number must be 2 uppercase letters followed by 4 digits.');
            return false;
        } else if (isDuplicateFlightNumber(flightNo.value.trim())) {
            displayError('flightNoError', 'This flight number already exists. Please choose another one.');
            return false;
        } else {
            hideError('flightNoError');
            return true;
        }
    }

    function validateLocations() {
        let valid = true;

        if (origin.value.trim() === '') {
            displayError('originError', 'Origin cannot be empty.');
            valid = false;
      
        } else {
            hideError('originError');
        }

        if (destination.value.trim() === '') {
            displayError('destinationError', 'Destination cannot be empty.');
            valid = false;
        } else {  
        hideError('destinationError');
        }

        if (!validateDifferentLocations(origin.value, destination.value)) {
            displayError('destinationError', 'Origin and destination cannot be the same.');
            valid = false;
        }

        return valid;
    }

    function validateDatesAndTimes() {
        let valid = true;

        const departureDateTime = `${boardingDate.value}T${boardingTime.value}`;
        const landingDateTime = `${arrivalDate.value}T${arrivalTime.value}`;


        boardingDate.addEventListener('change', () => {
            if (!validateDate(boardingDate.value, boardingTime.value)) {
                displayError('boardingDateError', 'Boarding date/time must be in the future.');
            } else {
                hideError('boardingDateError');
            }
        });
        
        arrivalDate.addEventListener('change', () => {
            if (!validateDate(arrivalDate.value, arrivalTime.value, boardingDate.value, boardingTime.value)) {
                displayError('arrivalDateError', 'Arrival date/time must be after boarding date/time.');
                valid = false;
            } else {
                hideError('arrivalDateError');
            }
        });
         
        if (!validateDateTimeInFuture(departureDateTime)) {
            displayError('boardingDateError', 'Boarding date and time must be in the future.');
            valid = false;
        } else {
            hideError('boardingDateError');
        }

        if (!validateDateTimeInFuture(landingDateTime)) {
            displayError('arrivalDateError', 'Arrival date and time must be in the future.');
            valid = false;
        } else {
            hideError('arrivalDateError');
        }

        if (!validateArrivalAfterDeparture(boardingDate.value, boardingTime.value, arrivalDate.value, arrivalTime.value)) {
            displayError('arrivalDateError', 'Landing must be after departure.');
            valid = false;
        } else {
            hideError('arrivalDateError');
        }

        if (!validateTimeFormat(boardingTime.value)) {
            displayError('boardingTimeError', 'Invalid time format (HH:MM).');
            valid = false;
        } else {
            hideError('boardingTimeError');
        }

        if (!validateTimeFormat(arrivalTime.value)) {
            displayError('arrivalTimeError', 'Invalid time format (HH:MM).');
            valid = false;
        } else {
            hideError('arrivalTimeError');
        }

        if (!validateDateRange(boardingDate.value, arrivalDate.value)) {
            displayError('arrivalDateError', 'Arrival date cannot be more than one year after the boarding date.');
            valid = false;
        }

        if (boardingDate.value === arrivalDate.value && !validateArrivalAfterDeparture(boardingDate.value, boardingTime.value, arrivalDate.value, arrivalTime.value)) {
            displayError('arrivalTimeError', 'Arrival time must be after boarding time on the same day.');
            valid = false;
        }

        return valid;
    }

    function validateSeats() {
        if (!validateSeatCount(seats.value)) {
            displayError('seatsError', 'Number of seats must be between 1 and 850.');
            return false;
        } else {
            hideError('seatsError');
            return true;
        }
    

    }

    function isDuplicateFlightNumber(value) {
        const flights = JSON.parse(sessionStorage.getItem('flights')) || [];
        return flights.some((flight) => flight.flightNo.toUpperCase() === value.toUpperCase());
    }
    
});
