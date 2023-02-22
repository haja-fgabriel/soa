import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonPicker, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import {imageOutline, addCircleOutline, checkboxSharp, checkmark, options, images} from 'ionicons/icons';
import { useCamera } from "@capacitor-community/camera-react";
import { CameraResultType, CameraSource } from "@capacitor/camera";
import React, { useState } from "react";

import './OfferEditPage.css';
import { RouteComponentProps } from "react-router";

interface AddPictureProps {
    source?: string;
    onEditSource: () => void;
}

const AddPicture: React.FC<AddPictureProps> = ({source, onEditSource}) => {
    return (
        <div className="add-picture" onClick={() => onEditSource()}>
            {(!source && <IonIcon className="add-picture" icon={images} />) ||
             (source && <IonImg src={source} />)}
        </div>
    );
};

export const OfferEditPage: React.FC<RouteComponentProps> = () => {
    const [currentPicture, setCurrentPicture] = useState<string | undefined>();
    const [currentName, setCurrentName] = useState<string>("");
    const [currentPrice, setCurrentPrice] = useState<number>(0.00);
    const [fullDescription, setFullDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const { getPhoto } = useCamera();
    const [uploading, setUploading] = useState<boolean>(false);

    async function pickPicture() {
        const photo = await getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 100
        });
        setCurrentPicture(photo.dataUrl);
    }

    async function tryAddOffer() {
         setUploading(true);
         
    }

    console.log("OfferEditPage render")

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Add new offer</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>Add a new offer</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <AddPicture source={currentPicture} onEditSource={() => pickPicture()} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Name</IonLabel>
                        <IonInput onIonChange={e => setCurrentName(e.detail.value || "")}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Price</IonLabel>
                        <IonInput onIonChange={e => setCurrentPrice(Number.parseFloat(e.detail.value || "0"))}></IonInput>
                        <IonPicker columns={
                            [
                                { name: "USD", options: [] },
                                { name: "EUR", options: [] },
                            ]
                            } isOpen={false} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Full description</IonLabel>
                        <IonTextarea onIonChange={e => setFullDescription(e.detail.value || "")}></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Location</IonLabel>
                        <IonInput onIonChange={e => setLocation(e.detail.value || "")}></IonInput>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton onClick={() => tryAddOffer()}>
                    <IonIcon icon={checkmark}></IonIcon>
                    <IonLabel>Add offer</IonLabel>
                </IonFabButton>
            </IonFab>
            <IonLoading isOpen={uploading} message={"Adding offer..."} />
        </IonPage>
    )
}