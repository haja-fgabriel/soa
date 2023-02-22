import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonFabButton, IonIcon, IonImg, IonLabel, IonList, IonSearchbar } from "@ionic/react";
import {} from 'ionicons';
import { add, invertModeSharp } from "ionicons/icons";
import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router";
import { getOffers } from "../../api/offers";
import { AuthContext, AuthState } from "../../auth/AuthProvider";
import { Offer } from "../../models/Offer";

import './OfferList.css';

interface OfferProps {
    item: Offer;
}

const OfferCard: React.FC<OfferProps> = ({item}) => (
    <IonCard routerLink={`/offers/${item.id}`}>
        <IonCardHeader>
            <IonImg className="offer-image" src={item.image} />
            <IonCardTitle >{item.name}</IonCardTitle>
            <IonCardSubtitle className="offer-price" color="dark">{item.price.amount} {item.price.currency}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
            <IonCardSubtitle>{item.location}</IonCardSubtitle>
            <IonCardSubtitle>Last updated: {(new Date(item.lastUpdated)).toLocaleString()}</IonCardSubtitle>
        </IonCardContent>
    </IonCard>
);

export const OfferList: React.FC = () => {
    const [items, setItems] = useState<Offer[]>([]);
    const { token } = useContext<AuthState>(AuthContext);
    useEffect(() => {
        async function getAll() {
            const newItems = (await getOffers(token)).data;
            setItems(newItems);
        };

        getAll().catch((x) => {
            console.error(x);
        });
    }, [])

    return (
        <>
        <IonSearchbar></IonSearchbar>
        <IonList>
            { items.map(item => <OfferCard item={item} />) }
        </IonList>
        </>
    )
}