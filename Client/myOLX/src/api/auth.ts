import axios, { AxiosResponse } from "axios";

import { BASE_URL } from ".";

export interface AuthTokenProps {
    access?: string;
    reset?: string;
}

export const getAuthenticationToken: (arg0: string, arg1: string) => Promise<AxiosResponse<AuthTokenProps>> = (username: string, password: string) => {
    return axios.post(`${BASE_URL}/api/token`, {username, password});
}

export const resetAuthenticationToken = (username: string, password: string) => {
    return axios.post(`${BASE_URL}/api/token/reset`, {username, password});
}