import { json } from "@remix-run/node";
import devicesProvider from "../api/devices";
import clientsProvider from "../api/clients";
import { getUser } from "~/session.server";
import { Link, useLoaderData } from "@remix-run/react";
import hardwaresProvider from "../api/hardwares";

export const meta = () => [{ title: "Dispositivi del cliente" }];

export async function loader({ request, params }) {
    const user = await getUser(request);
    const device = await devicesProvider.getById(user.token, params.did);
    const hardwares = await hardwaresProvider.getAll(user.token, params.did);

    return json({ device, hardwares });
}

export default function BackofficeClientsCidDevices() {
    const { device, hardwares } = useLoaderData();

    return (
        <main className="relative min-h-screen bg-white">
            <div className="">
                <Link to="/backoffice/clients"><ion-icon name="arrow-back-outline" size="large"></ion-icon></Link>
                <div className="flex justify-between items-center">
                    <p className="py-6 text-2xl">Lista macchinari del device {device.name}</p>
                </div>

                <table className="w-full table-fixed">
                    <thead className="text-left bg-green-700">
                        <tr className="text-white text-xl">
                            <th>id</th>
                            <th>nome</th>
                            <th>hw id</th>
                            <th>model path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hardwares.map((hardware, idx) =>
                            <tr key={idx}>
                                <td>{hardware.id}</td>
                                <td>{hardware.name}</td>
                                <td>{hardware.hw_id}</td>
                                <td>{hardware.model_path}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
