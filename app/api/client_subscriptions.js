import axios from "axios";

async function getAll(token, clientId) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/subscriptions/client_subscriptions",
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

async function getById(token, clientId, id) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/subscriptions/client_subscriptions/" + id,
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

async function add(token, clientId, values) {
    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/subscriptions/" + values.subscriptionId + "/client_subscriptions",
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
        return data.data.error;
    } else {
        return data?.data.data;
    }
}

async function remove(token, clientId, id) {
    const data = await axios.delete(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/subscriptions/client_subscriptions/" + id,
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

async function modify(token, clientId, id, values) {
    const data = await axios.put(process.env.API_ENDPOINT + "/backoffice/clients/" + clientId + "/subscriptions/client_subscriptions/" + id,
        {
            ...values
        },
        {
            headers: {
                "Accept": "application/json",
                "X-AUTH-TOKEN": token
            }
        });

    if (data.data.error) {
        return data.data.error;
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
