import axios, { AxiosResponse } from 'axios';
import { Offer } from "../models/Offer";
import { BASE_URL } from '.';

export const authConfig = (token?: string) => ({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

export async function getOffers(token: string): Promise<AxiosResponse<Offer[]>> {
    return axios.get(`${BASE_URL}/api/offer/`, authConfig(token));
}

export async function getOfferById(id: string, token: string): Promise<AxiosResponse<Offer>> {
    return axios.get(`${BASE_URL}/api/offer/${id}`, authConfig(token));
}

export async function postOffer(offer: Offer, token: string) {
    return axios.post(`${BASE_URL}/api/offer`, offer, authConfig(token));
}