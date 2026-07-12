import {
    Outlet,
    createRootRoute,
    createRoute,
    createRouter,
    redirect,
} from "@tanstack/react-router";

import { LoginPage } from "./features/auth/pages/LoginPage";
import { VehiclesPage } from "./features/vehicles/pages/VehiclesPage";

const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/login",
        });
    },
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const vehiclesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/vehicles",
    beforeLoad: () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
        throw redirect({
            to: "/login",
        });
        }
    },
    component: VehiclesPage,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    vehiclesRoute,
]);

export const router = createRouter({
    routeTree,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}