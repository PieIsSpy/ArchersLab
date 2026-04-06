const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchAccount = async(id) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err)
    }
}

export const createAccount = async(info) => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            credentials: 'include',
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

export const updateAccount = async(info, form) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${info._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        
        return response;
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
}

export const deleteAccount = async(password, id) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                password: password
            })
        })

        return response;
    } catch (err) {
        console.error(err)
    }
}

export const loginAccount = async(password, id, remember) => {
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: Number(id),
                password: password,
                remember: remember
            }),
        })

        return response;
    } catch (err) {
        console.error(err)
    }
}

export const logoutAccount = async() => {
    try {
        const response = await fetch(`${API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include',
        })

        return response;
    } catch (err) {
        console.error(err)
    }
}