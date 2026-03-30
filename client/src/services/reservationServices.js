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