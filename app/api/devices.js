import axios from "axios";

async function getAll(token, id) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients/" + id + "/devices",
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

async function getById(token, id) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/devices/" + id,
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

async function add(token, clientId, values) {
    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/devices",
        {
            ...values,
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

async function remove(token, clientId, id) {
    const data = await axios.delete(process.env.API_ENDPOINT + "backoffice/clients/" + { clientId } + "/devices/" + { id },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

export default { getAll, getById, add, remove }
