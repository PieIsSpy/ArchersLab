const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchReservations = async () => {
    const reservationsUrl = `${API_URL}/api/reservations`;
    try {
        const response = await fetch(reservationsUrl, {
			method: 'GET',
			credentials: 'include',
		})

        const reservationsData = await response.json();

        return reservationsData;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
};

export const fetchFilteredReservations = async (settings) => {
    try {
        const response = await fetch(`${API_URL}/api/reservations/filtered`, {
            method: 'POST',
			credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })

        return await response.json();
    } catch (err) {
        console.error("Error:", err);
    }
}

export const createReservation = async (reservation) => {
    try {
        const response = await fetch(`${API_URL}/api/reservations`, {
            method: 'POST',
			credentials: 'include',
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

export const modifyReservation = async (mode,reservationId) => {
	try {
		if (mode === "approve")
		{
			console.log("Approving Reservation "+reservationId);
			var response = await fetch(`${API_URL}/api/reservations/${reservationId}`, {
				method: "PUT",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					resStatus: "Approved"
				})
			});
		}
		else 
		{
			console.log("Cancelling Reservation "+reservationId);
			var response = await fetch(`${API_URL}/api/reservations/${reservationId}`, {
				method: "PUT",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					resStatus: "Cancelled"
				})
			});
		}

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Cancel failed");
		}

		await fetchReservations();
		alert("Reservation updated!");
	} catch (err) {
		console.error("Error:", err);
	}
}