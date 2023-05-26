import axios from "axios";

async function getAll(token) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients",
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
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients/" + id,
        {
            headers: {
                "Accept": "application/json",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return null;
    } else {
        return data?.data?.data.length > 0 ?
            data?.data.data.pop() :
            null;
    }
}

async function add(token, values) {
    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/clients",
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

async function remove(token, id) {
    const data = await axios.delete(process.env.API_ENDPOINT + "/backoffice/clients/" + id,
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

async function modify(token, id, values) {
    delete values.clientId;

    const data = await axios.put(process.env.API_ENDPOINT + "/backoffice/clients/" + id,
        {
            ...values,
        },
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

export default {
    getAll,
    getById,
    add,
    remove,
    modify,
}

