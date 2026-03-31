export const fetchReservations = async () => {
    const reservationsUrl = 'http://localhost:5000/api/reservations';
    try {
        const response = await fetch(reservationsUrl)

        const reservationsData = await response.json();

        return reservationsData;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
};

export const createReservation = async (reservation) => {
    try {
        const response = await fetch('http://localhost:5000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        })

        return response;
    } catch (err) {
        console.error("Error:", err);
    }
}