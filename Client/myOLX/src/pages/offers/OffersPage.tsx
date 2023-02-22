import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar, IonFabButton, IonIcon, IonFab } from '@ionic/react';
import { add } from 'ionicons/icons';
import { OfferList } from '../../components/offers/OfferList';
import './OffersPage.css';
import { RouteComponentProps } from 'react-router';

const OffersPage: React.FC<RouteComponentProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Offers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Offers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OfferList />
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
            <IonFabButton routerLink='/offers/add'>
                <IonIcon icon={add}></IonIcon>
                <IonLabel>Add new offer</IonLabel>
            </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default OffersPage;
