import { Link } from "@remix-run/react";

export const meta = () => [{ title: "Backoffice" }];

export default function Index() {
    return (
        <main className="relative">
            <div className="sm:flex sm:items-center sm:justify-center relative sm:pb-16 sm:pt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-8">
                        <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-6xl">
                            <span className="block uppercase text-green-500 drop-shadow-md">
                                pajusco tecnologie
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex justify-around">
                <div className="p-8 px-16 rounded shadow-2xl">
                    <p className="py-2 text-xl text-center">Lista clienti</p>
                    <Link className="block px-8 py-4 bg-green-400 rounded hover:shadow-lg" to="clients">Clienti</Link>
                </div>
            </div>
        </main>
    );
}
