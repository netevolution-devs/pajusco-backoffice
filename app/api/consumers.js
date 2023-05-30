import axios from "axios";

async function getAll(token, id) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients/" + id + "/users",
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
    values.authorized = values.authorized === "on" ? true : false;
    values.business_role = parseInt(values.business_role);

    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/users",
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
    const data = await axios.delete(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/users/" + id,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

async function modify(token, clientId, id, values) {
    values.authorized = values.authorized === "on" ? true : false;

    const data = await axios.put(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/users/" + id,
        {
            ...values,
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data.data;
    }
}

export default { getAll, remove, add, modify }
