import axios from "axios";

async function getAll(token) {
    const data = await axios.get(process.env.API_ENDPOINT + "/backoffice/subscriptions",
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

async function add(token, values) {
    values.activable = values.activable == "on" ? 1 : 0;

    const data = await axios.post(process.env.API_ENDPOINT + "/backoffice/subscriptions",
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
    const data = await axios.delete(process.env.API_ENDPOINT + "/backoffice/subscriptions/" + id,
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
    delete values.subscriptionId;
    values.activable = values.activable == "on" ? 1 : 0;

    const data = await axios.put(process.env.API_ENDPOINT + "/backoffice/subscriptions/" + id,
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

export default { getAll, add, remove, modify }
