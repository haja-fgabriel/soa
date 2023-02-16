import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, bagOutline, chatbubbleEllipsesOutline, personCircleOutline, personOutline } from 'ionicons/icons';
import OffersPage from './pages/offers/Tab1';
import Tab2 from './pages/messages/Tab2';
import Tab3 from './pages/account/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import OfferViewPage from './pages/offers/OfferViewPage';
import { OfferEditPage } from './pages/offers/OfferEditPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/offers/:id" component={OfferViewPage} />
          <Route exact path="/offers/add" component={OfferEditPage} />
          <Route exact path="/offers" component={OffersPage} />
          <Route exact path="/messages" component={Tab2} />
          <Route path="/account" component={Tab3} />
          
          <Route exact path="/" render={() => <Redirect to="/offers" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">

          <IonTabButton tab="tab1" href="/offers">
            <IonIcon icon={bagOutline} />
            <IonLabel>Offers</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/messages">
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab3" href="/account">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
