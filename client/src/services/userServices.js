export const createAccount = async(info) => {
    try {
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create account")
        }
    } catch (err) {
        console.error("Error:", err);
    }
}