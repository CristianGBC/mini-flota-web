
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">
                    Correo electrónico
                </label>

                <input
                    id="email"
                    type="email"
                    {...register("email")}
                />

                {errors.email && (
                    <p>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password">
                    Contraseña
                </label>

                <input
                    id="password"
                    type="password"
                    {...register("password")}
                />

                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </div>

            {serverError && (
                <p role="alert">{serverError}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Ingresando..."
                    : "Iniciar sesión"}
            </button>
        </form>
    );
}

