import { axiosInstance } from "../../../api/axiosInstance";

import type { LoginFormData } from "../utils/loginValidator";

type LoginResponse = {
    access_token: string;
    token_type: string;
};

export async function login(
    credentials: LoginFormData,
): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        formData,
        {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        },
    );

    return response.data;
}