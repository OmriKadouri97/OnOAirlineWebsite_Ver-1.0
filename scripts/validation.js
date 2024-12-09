export function validateFlightNumber(value) {
    const regex = /^[A-Z]{2}\d{4}$/;
    return regex.test(value.trim());
}

/**
 * Validate location: Ensure the origin and destination are not the same
 */
export function validateDifferentLocations(origin, destination) {
    return origin.trim().toLowerCase() !== destination.trim().toLowerCase();
}

/**
 * Validate date and time: 
 * - Ensure the date is in the correct format (YYYY-MM-DD).
 * - Ensure the time is in the correct 24-hour format (HH:MM).
 * - Ensure the date and time are in the future.
 * - If `compareDate` and `compareTime` are provided, ensure the date and time are logically consistent.
 */
export function validateDate(inputDate, inputTime, compareDate = null, compareTime = null) {
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) return false;

    // Validate time format
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(inputTime)) return false;

    // Combine inputDate and inputTime into a Date object
    const inputDateTime = new Date(`${inputDate}T${inputTime}`);
    const now = new Date();

    // Ensure the date and time are in the future
    if (inputDateTime <= now) return false;

    // If comparison date and time are provided, check logical consistency
    if (compareDate && compareTime) {
        const compareDateTime = new Date(`${compareDate}T${compareTime}`);

        // Ensure inputDateTime is strictly after compareDateTime
        if (inputDateTime <= compareDateTime) {
            return false;
        }
    }

    return true;
}


export function validateDateTimeInFuture(dateTime) {
    const inputDateTime = new Date(dateTime);
    const now = new Date();
    return inputDateTime > now;
}

/**
 * Validate date range: Landing date cannot exceed a year from departure
 */
export function validateDateRange(departureDate, landingDate) {
    const departure = new Date(departureDate);
    const landing = new Date(landingDate);
    const oneYearLater = new Date(departure);
    oneYearLater.setFullYear(departure.getFullYear() + 1);
    return landing <= oneYearLater;
}

/**
 * Validates that the time is in 24-hour format HH:MM.
 */
export function validateTimeFormat(time) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time.trim());
}

export function validateSeatCount(value) {
    // Ensure the seat count is a positive integer between 1 and 850.
    const seats = parseInt(value, 10);
    return !isNaN(seats) && seats >= 1 && seats <= 850;
}

export function validateArrivalAfterDeparture(boardingDate, boardingTime, arrivalDate, arrivalTime) {
    // Combine boarding and arrival into Date objects
    const departure = new Date(`${boardingDate}T${boardingTime}`);
    const arrival = new Date(`${arrivalDate}T${arrivalTime}`);

    // Ensure arrival is after departure
    return arrival > departure;
}


export function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
}

export function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = "none";
    }
}

// Additional validation functions...
