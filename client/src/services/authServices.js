export const initializeSession = async() => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/init', {
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