import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
            <div className="w-full max-w-md">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Mini Flota
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Ingresa tus credenciales para acceder al sistema.
                    </p>
                </header>

                <LoginForm />
            </div>
        </main>
    );
}