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

export const updateAccount = async(info, form) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${info._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        const data = await response.json();
        if (!response.ok) {
            alert(data.message)
        } else {
            console.log(data)
            return data;
        }
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
}