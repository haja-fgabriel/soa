import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ProfileContainer } from '../../components/account/ProfileContainer';
import './ProfilePage.css';

export const ProfilePage: React.FC<RouteComponentProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 3 page" /> */}
        <ProfileContainer />
      </IonContent>
    </IonPage>
  );
};
