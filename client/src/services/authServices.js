const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const initializeSession = async() => {
    try {
        const response = await fetch(`${API_URL}/api/auth/init`, {
            method: 'GET',
            credentials: 'include'
        })

        if (!response.ok) {
            return {isAuth: false}
        }
        
        const data = await response.json()
        return data;
    } catch (err) {
        console.error(err);
    }
}