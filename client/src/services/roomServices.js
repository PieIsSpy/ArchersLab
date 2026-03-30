export const fetchRooms = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/rooms')

        if (response.ok) {
            const data = await response.json()
            return data;
        }
    } catch (err) {
        console.error('Error fetching', err) 
    }
}