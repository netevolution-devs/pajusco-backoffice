import { json, redirect } from "@remix-run/node";
import clientSubscriptionsProvider from "../api/client_subscriptions";
import clientsProvider from "../api/clients";
import subscriptionsProvider from "../api/subscriptions";
import { getUser } from "~/session.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import ModifyClientSubscription from "../components/modals/ModifyClientSubscription";
import { safeRedirect } from "~/utils";
import AddClientSubscription from "../components/modals/AddClientSubscription";

export const meta = () => [{ title: "Abbonamenti del cliente" }];

export async function loader({ request, params }) {
    const user = await getUser(request);
    const clientSubscriptions = await clientSubscriptionsProvider.getAll(user.token, params.cid);
    const subscriptions = await subscriptionsProvider.getAll(user.token);
    const client = await clientsProvider.getById(user.token, params.cid);

    return json({ client, clientSubscriptions, subscriptions });
}

export const action = async ({ request, params }) => {
    const user = await getUser(request);
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData)

    if (_action === "add") {
        const res = await clientSubscriptionsProvider.add(user.token, params.cid, values);
    }
    if (_action === "modify") {
        const res = await clientSubscriptionsProvider.modify(user.token, params.cid, values.clientSubscriptionId, values);
    }
    if (_action === "remove") {
        const res = await clientSubscriptionsProvider.remove(user.token, params.cid, values.clientSubscriptionId);
    }

    const redirectTo = safeRedirect(formData.get("redirectTo"), `/backoffice/clients/${params.cid}/subscriptions`);
    return redirect(redirectTo);
}

export default function BackofficeClientsCidSubscription() {
    const { client, clientSubscriptions, subscriptions } = useLoaderData();

    return (
        <main className="relative">
            <div>
                <Link to="/backoffice/clients"><ion-icon name="arrow-back-outline" size="large"></ion-icon></Link>
                <div className="flex justify-between items-center">
                    <p className="py-6 text-2xl">Lista abbonamenti del cliente {client.name}</p>
                    <AddClientSubscription clientSubscription={client} subscriptions={subscriptions} />
                </div>

                <table className="w-full table-fixed">
                    <thead className="text-left bg-green-700">
                        <tr className="text-white text-xl">
                            <th>id</th>
                            <th>nome</th>
                            <th>tipo</th>
                            <th>descrizione</th>
                            <th>inizio</th>
                            <th>scadenza</th>
                            <th>durata</th>
                            <th>prezzo (€)</th>
                            <th>attivo</th>
                            <th>azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientSubscriptions.map((clientSubscription, idx) =>
                            <tr key={idx}>
                                <td>{clientSubscription.id}</td>
                                <td>{clientSubscription.subscription.name ?? "-"}</td>
                                <td>{clientSubscription.subscription.type ?? "-"}</td>
                                <td>{clientSubscription.subscription.description ?? "-"}</td>
                                <td>{new Date(clientSubscription.start_date).toLocaleString("it-IT", { "year": "2-digit", "month": "2-digit", "day": "2-digit" }) ?? "-"}</td>
                                <td>{new Date(clientSubscription.deadline).toLocaleString("it-IT", { "year": "2-digit", "month": "2-digit", "day": "2-digit" }) ?? "-"}</td>
                                <td>{clientSubscription.subscription.duration ?? "-"} giorni</td>
                                <td>{clientSubscription.price ?? "-"} €</td>
                                <td>{clientSubscription.subscription.activable ? "✔️" : "⭕"}</td>
                                <td className="flex items-center space-x-4">
                                    <ModifyClientSubscription clientSubscription={clientSubscription} />
                                    <Form method="post">
                                        <input name="clientSubscriptionId" value={clientSubscription.id} type="hidden" />
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
