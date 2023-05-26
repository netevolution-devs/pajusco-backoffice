import { useOptionalUser } from "~/utils";
import { Form, Link } from "@remix-run/react";

export default function Header() {
    const user = useOptionalUser();

    return (
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
                <Link to="/"><img className="w-1/6" src="/assets/images/logo.png" /></Link>
            </h1>
            <div className="flex items-center gap-x-10">
                <p className="rounded bg-slate-600 px-4 py-2">{user.name}</p>
                <Form action="/logout" method="post">
                    <button type="submit" className="rounded px-4 py-2 text-blue-100 bg-red-500 hover:bg-red-600 active:bg-red-600">Logout</button>
                </Form>
            </div>
        </header>
    );
}
