import { json, redirect } from "@remix-run/node";
import clientsProvider from "../api/clients";
import { getUser } from "~/session.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import AddClient from "../components/modals/AddClient";
import { safeRedirect } from "~/utils";
import ModifyClient from "../components/modals/ModifyClient";

export const meta = () => [{ title: "Clienti" }];

export async function loader({ request }) {
    const user = await getUser(request);
    const clients = await clientsProvider.getAll(user.token);
    return json({ clients });
}

export const action = async ({ request }) => {
    const user = await getUser(request);
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData)

    if (_action === "add") {
        const res = clientsProvider.add(user.token, values);
    }
    if (_action === "remove") {
        const res = clientsProvider.remove(user.token, values.clientId);
    }
    if (_action === "modify") {
        const res = clientsProvider.modify(user.token, values.clientId, values);
    }

    const redirectTo = safeRedirect(formData.get("redirectTo"), "/backoffice/clients");
    return redirect(redirectTo);
}

export default function BackofficeClients() {
    const { clients } = useLoaderData();

    return (
        <main>
            <div>
                <Link to="/backoffice"><ion-icon name="arrow-back-outline" size="large"></ion-icon></Link>

                <div className="flex justify-between items-center">
                    <p className="py-6 text-2xl">Lista clienti</p>
                    <AddClient />
                </div>

                <table className="w-full table-fixed">
                    <thead className="text-left bg-green-700">
                        <tr className="text-white text-xl">
                            <th>id</th>
                            <th>nome</th>
                            <th>codice</th>
                            <th>azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, idx) =>
                            <tr key={idx}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.code}</td>
                                <td className="flex items-center space-x-4">
                                    <Link to={`${client.id}/consumers`}><ion-icon name="people-outline"></ion-icon></Link>
                                    <Link to={`${client.id}/devices`}><ion-icon name="file-tray-full-outline"></ion-icon></Link>
                                    <ModifyClient client={client} />
                                    <Form method="post">
                                        <input name="clientId" value={client.id} type="hidden" />
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
