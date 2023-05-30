import { json, redirect } from "@remix-run/node";
import devicesProvider from "../api/devices";
import clientsProvider from "../api/clients";
import { getUser } from "~/session.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import HardwareList from "../components/modals/HardwareList";
import AddDevice from "../components/modals/AddDevice";
import { safeRedirect } from "~/utils";

export const meta = () => [{ title: "Devices del cliente" }];

export async function loader({ request, params }) {
    const user = await getUser(request);
    const devices = await devicesProvider.getAll(user.token, params.cid);
    const client = await clientsProvider.getById(user.token, params.cid);

    return json({ client, devices });
}

export async function action({ request, params }) {
    const user = await getUser(request);
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData)

    if (_action === "add") {
        const res = devicesProvider.add(user.token, params.cid, values);
    }
    if (_action === "remove") {
        const res = devicesProvider.remove(user.token, params.cid, values.deviceId);
    }

    const redirectTo = safeRedirect(formData.get("redirectTo"), `/backoffice/clients/${params.cid}/devices`);
    return redirect(redirectTo);
}

export default function BackofficeClientsCidDevices() {
    const { client, devices } = useLoaderData();

    return (
        <main className="relative">
            <div>
                <Link to="/backoffice/clients"><ion-icon name="arrow-back-outline" size="large"></ion-icon></Link>
                <div className="flex justify-between items-center">
                    <p className="py-6 text-2xl">Lista devices del cliente {client.name}</p>
                    <AddDevice client={client} />
                </div>

                <table className="w-full table-fixed">
                    <thead className="text-left bg-green-700">
                        <tr className="text-white text-xl">
                            <th>id</th>
                            <th>nome</th>
                            <th>hw id</th>
                            <th>model path</th>
                            <th>azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device, idx) =>
                            <tr key={idx}>
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>{device.hw_id}</td>
                                <td>{device.model_path}</td>
                                <td className="flex items-center space-x-4">
                                    <HardwareList device={device} />
                                    {/* <ModifyClient client={client} />*/}
                                    <Form method="post">
                                        <input name="deviceId" value={device.id} type="hidden" />
                                        <button name="_action" value="remove">
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                    </Form>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
