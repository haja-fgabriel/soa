import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { backspace } from "ionicons/icons";
import React, { useEffect, useState, useContext } from "react"
import { RouteComponentProps } from "react-router";
import { Offer } from "../../models/Offer";
import {chatbubbleEllipsesOutline} from 'ionicons/icons'

import './OfferViewPage.css';
import { getOfferById } from "../../api/offers";
import { AuthContext, AuthState } from "../../auth/AuthProvider";


const fullDescription = `
Features

- Enjoy the next generation of PlayStation games with ultra-fast SSD-like light-loading speeds, haptic feedback, adaptive triggers, and 3D audio for a deeper immersive experience
- All digital versions without disk drives. Log in to an account registered with the Playstation Network and go to the Playstation Store to purchase and download the download version of the PS5/PS4 game.
- Superfast SSD
- Integrated I/O
- Up to R120FPS
- Ray tracing
- 4KTV Gaming
- HDR technology

Specifications

- Model : CFI-1118 Series (no. CFI-1118B 01)
- Date of Manufacture: 2022.05

CPU
System
-  Custom Microarchitecture Based on AMD Zen 2
- Specification: 8 core 16 thread, maximum clock 3.5 GHz (down clock under certain circumstances)
Input and output
- 1-core processors for SSD I/O processing + 1-core processors for memory mapping operations

GPU
- Custom Microarchitecture Based on AMD RDNA 2
- Specifications: 10.28 TFLOPS when operating with a maximum clock of 2.23 GHz
- 18 WGPs (36 CUs, 2304 SPs, 64ROPs, 144 TFUs), L2 cache memory 4MB, up to 2.23GHz
- Special Accessories: Cache Memory Sunlight Engine

Memory : GDDR6 memory specification, memory capacity total 16GB, memory bus total 256-bit, data transfer rate 14Gbp
Memory allocation : 3.5GB operating system, 12.5GB gaming, 448GB/sec data transfer width
Built-in storage : 825GB NBMe SSD (5.5GB/sec, 8-9GB/sec compressed)
Extended storage : SIE-certified NVMe SSD (to be supported), USB external HDD/SSD support
Image output : HDMI 2.1, up to 4K, 120FPS rendering, up to 8K 60Hz output, BVRR, ALLM
Audio : Tempest Engine Audio Chip: Computational performance up to 100GFLOPS
Input/Output
- USB A-type port (high speed USB)
- 2 USB A-type ports (SuperSpeed USB 10Gbps)
- USB C-type port (SuperSpeed USB 10Gbps) 
Communication
- Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T)
- Two UWiFi IEEE 802.11BA ports (SuperSpeed USB 10Gbps)
- Blutooth 5.1
Size : 390 x 92 x 260mm ( 15.3 x 3.6 x 10.2 in)
 * Protrusions and pedestals excluded from measurement
Weight: 3.9kg
Other devices : Anti-theft mounting slot (Kensington lock)
Controller : Dual-sense controller (PS4 sub-compatible game limited, dual-shock 4 available)
Operating System : Orbris 2.0
- Made in China

Contents

- PS5
- Dual-sense controller
- Power cable
- HDMI cable
- Dual-sense charging jack
- Cradle
- Plug type C (Korea. ver)

`;


const OfferViewPage: React.FC<RouteComponentProps<{id?: string}>> = ({history, match}) => {
    const [offer, setOffer] = useState<Offer | undefined>();
    const { token } = useContext<AuthState>(AuthContext);
    const id: string | undefined = match.params.id;

    useEffect(() => {
        async function getItem() {
            if (!id) return;
            const item = (await getOfferById(id, token)).data;
            item.lastUpdated = new Date(item.lastUpdated);
            debugger;
            setOffer(item);
        }
        
        
        getItem().catch((x) => {
            console.error(x);
        });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>exemplu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>exemplu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    (!offer && (<IonText>Item not found.</IonText>)) || (offer &&
                    (<>
                        
                        <IonImg src={offer.image} />
                        <IonList>
                            <IonItem className="offer-date" lines="none">
                                <IonLabel>{offer.lastUpdated.toDateString()}</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonText>
                                    <h3>{offer.name}</h3>
                                </IonText>
                                
                                <IonText className="offer-price" slot="end">
                                    <h4>{offer.price.currency} {offer.price.amount}</h4>
                                </IonText>
                            </IonItem>
                            <IonItem>
                                <IonButton>
                                    <IonIcon icon={chatbubbleEllipsesOutline} />
                                    Message owner
                                </IonButton>
                            </IonItem>
                            <IonItem lines="none">
                                <IonText>
                                    <h3>Full description</h3>
                                </IonText>
                            </IonItem>
                            <IonItem lines="none">
                                {/* <IonText>{offer.fullDescription}</IonText> */}
                                <IonTextarea disabled>{offer.fullDescription}</IonTextarea>
                            </IonItem>
                        </IonList>
                    </>))
                }
            </IonContent>
        </IonPage>
    )
};

export default OfferViewPage;