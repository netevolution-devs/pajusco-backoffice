import { redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";

export async function loader({ request }) {
    const userId = await requireUserId(request);
    if (userId) {
        return redirect("/backoffice");
    } else {
        return redirect("/login");
    }
}
