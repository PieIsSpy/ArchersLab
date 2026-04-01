const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchRooms = async () => {
    try {
        const response = await fetch(`${API_URL}/api/rooms`)

        if (response.ok) {
            const data = await response.json()
            return data;
        }
    } catch (err) {
        console.error('Error fetching', err) 
    }
}