import { json, redirect } from "@remix-run/node";
import subscriptionsProvider from "../api/subscriptions";
import { getUser } from "~/session.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import AddSubscription from "../components/modals/AddSubscription";
import { safeRedirect } from "~/utils";
import ModifySubscription from "../components/modals/ModifySubscription";

export const meta = () => [{ title: "Abbonamenti" }];

export async function loader({ request }) {
    const user = await getUser(request);
    const subscriptions = await subscriptionsProvider.getAll(user.token);
    return json({ subscriptions });
}

export const action = async ({ request }) => {
    const user = await getUser(request);
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData);

    if (_action === "add") {
        const res = subscriptionsProvider.add(user.token, values);
    }
    if (_action === "remove") {
        const res = subscriptionsProvider.remove(user.token, values.subscriptionId);
    }
    if (_action === "modify") {
        const res = subscriptionsProvider.modify(user.token, values.subscriptionId, values);
    }

    const redirectTo = safeRedirect("/backoffice/subscriptions");
    return redirect(redirectTo);
}

export default function BackofficeSubscriptions() {
    const { subscriptions } = useLoaderData();

    return (
        <main>
            <div>
                <Link to="/backoffice"><ion-icon name="arrow-back-outline" size="large"></ion-icon></Link>

                <div className="flex justify-between items-center">
                    <p className="py-6 text-2xl">Lista abbonamenti</p>
                    <AddSubscription />
                </div>

                <table className="w-full table-fixed">
                    <thead className="text-left bg-green-700">
                        <tr className="text-white text-xl">
                            <th>id</th>
                            <th>nome</th>
                            <th>descrizione</th>
                            <th>tipo</th>
                            <th>durata (giorni)</th>
                            <th>prezzo (€)</th>
                            <th>utilizzabile</th>
                            <th>azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription, idx) =>
                            <tr key={idx}>
                                <td>{subscription.id}</td>
                                <td>{subscription.name}</td>
                                <td>{subscription.description}</td>
                                <td>{subscription.type}</td>
                                <td>{subscription.duration}</td>
                                <td>{subscription.price}</td>
                                <td>{subscription.activable ? "✔️" : "⭕"}</td>
                                <td className="flex items-center space-x-4">
                                    <ModifySubscription subscription={subscription} />
                                    <Form method="post">
                                        <input name="subscriptionId" value={subscription.id} type="hidden" />
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
