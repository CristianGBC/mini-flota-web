
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

import { login } from "../api/login";
import {
    loginSchema,
    type LoginFormData,
} from "../utils/loginValidator";

export function LoginForm() {
    const navigate = useNavigate();

    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError(null);

            const response = await login(data);

            localStorage.setItem(
                "access_token",
                response.access_token,
            );

            await navigate({
                to: "/vehicles",
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const detail = error.response?.data?.detail;

                setServerError(
                    typeof detail === "string"
                        ? detail
                        : "No se pudo iniciar sesión",
                );

                return;
            }

            setServerError("Ocurrió un error inesperado");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white p-6 shadow-sm"
        >
            <h2 className="mb-5 text-xl font-semibold text-slate-900">
                Iniciar sesión
            </h2>

            <div className="space-y-5">
                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="admin@miniflota.com"
                        {...register("email")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register("password")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            {serverError && (
                <p
                    role="alert"
                    className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700"
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Ingresando..."
                    : "Iniciar sesión"}
            </button>
        </form>
    );
}

