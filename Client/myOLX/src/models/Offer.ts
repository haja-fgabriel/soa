export interface Price {
    currency: string;
    amount: number;
}

export interface Offer {
    id?: string;
    name: string;
    price: Price;
    image: string;
    location: string;
    lastUpdated: Date;
    fullDescription?: string;
}
