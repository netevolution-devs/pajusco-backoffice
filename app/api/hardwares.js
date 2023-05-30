import axios from "axios";

async function getAll(deviceHardwareId) {
    // client side, use env exposed from window
    const data = await axios.get(window.ENV.API_ENDPOINT + "/backoffice/corvina/devices/" + deviceHardwareId + "/hardwares",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    if (data.data.error) {
        return data.data;
    } else {
        return data?.data;
    }
}

export default { getAll }
