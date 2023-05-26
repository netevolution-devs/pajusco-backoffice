import { Outlet } from "@remix-run/react";
import Header from "../components/Header";

export const meta = () => [{ title: "Backoffice" }];

export default function Index() {
    return (
        <main className="flex flex-col justify-between min-h-screen">
            <div>
                <Header />

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            <div className="p-4 text-center bg-slate-800">
                <p className="text-white">© 2023 Net Evolution</p>
            </div>
        </main>
    );
}
