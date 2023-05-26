import axios from "axios";

async function login(email, password) {
    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/login",
        {
            email,
            password
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

async function whoami(token) {
    const data = await axios.get(process.env.API_ENDPOINT + "/users/whoami",
        {
            headers: {
                "Accept": "application/json",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

export default { login, whoami }
