import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import userProvider from "../api/user";

export const loader = async ({ request }) => {
    const userId = await getUserId(request);
    if (userId) return redirect("/");
    return json({});
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
    const remember = formData.get("remember");

    if (!validateEmail(email)) {
        return json(
            { errors: { email: "Email is invalid", password: null } },
            { status: 400 }
        );
    }

    if (typeof password !== "string" || password.length === 0) {
        return json(
            { errors: { email: null, password: "Password is required" } },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return json(
            { errors: { email: null, password: "Password is too short" } },
            { status: 400 }
        );
    }

    const user = await userProvider.login(email, password);
    if (!user) {
        return json(
            { errors: { email: "Invalid email or password", password: null } },
            { status: 400 }
        );
    }

    const userData = await userProvider.whoami(user.token);
    userData.token = user.token;

    return createUserSession({
        redirectTo,
        remember: remember === "on" ? true : false,
        request,
        userId: userData.id,
        userData,
    });
};

export const meta = () => [{ title: "Login" }];

export default function Login() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/backoffice";
    const actionData = useActionData();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (actionData?.errors?.email) {
            emailRef.current?.focus();
        } else if (actionData?.errors?.password) {
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className="flex min-h-full flex-col justify-center bg-gradient-to-t from-green-600 to-green-800">
            <div className="space-y-10 mx-auto w-full max-w-md px-4 md:px-8">
                <img src="/assets/images/logo.png" />
                <Form method="post" className="space-y-6 p-8 bg-white rounded-lg shadow-2xl">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input
                                ref={emailRef}
                                id="email"
                                required
                                autoFocus={true}
                                name="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={actionData?.errors?.email ? true : undefined}
                                aria-describedby="email-error"
                                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                            />

                            {actionData?.errors?.email ? (
                                <div className="pt-1 text-red-700" id="email-error">
                                    {actionData.errors.email}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input
                                id="password"
                                ref={passwordRef}
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                aria-invalid={actionData?.errors?.password ? true : undefined}
                                aria-describedby="password-error"
                                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                            />

                            {actionData?.errors?.password ? (
                                <div className="pt-1 text-red-700" id="password-error">
                                    {actionData.errors.password}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <button
                        type="submit"
                        className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-400"
                    >
                        Log in
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />

                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 capitalize">ricordami</label>
                        </div>
                        {/* <div className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                className="text-blue-500 underline"
                                to={{
                                    pathname: "/join",
                                    search: searchParams.toString(),
                                }}
                            >
                                Sign up
                            </Link>
                        </div> */}
                    </div>
                </Form>
            </div>
        </div>
    );
}
