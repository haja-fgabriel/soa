import axios, { AxiosResponse } from 'axios';
import { Offer } from "../models/Offer";

const BASE_URL = "http://localhost:3000";

export async function getOffers(): Promise<AxiosResponse<Offer[]>> {
    return axios.get(`${BASE_URL}/api/offer/`);
}

export async function getOfferById(id: string): Promise<AxiosResponse<Offer>> {
    return axios.get(`${BASE_URL}/api/offer/${id}`)
}