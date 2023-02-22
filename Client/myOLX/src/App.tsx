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
import OffersPage from './pages/offers/OffersPage';
import React, { useContext } from 'react';

import { PrivateRoute } from './auth/PrivateRoute';

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
import { AuthContext, AuthProvider } from './auth/AuthProvider';
import { ProfilePage } from './pages/account/ProfilePage';
import { Login } from './auth/Login';
import { setupConfig } from '@ionic/core';

setupIonicReact({swipeBackEnabled: false});

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(`App isAuthenticated=${isAuthenticated}`)

    return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonTabs>
              <IonRouterOutlet >
                <PrivateRoute exact={true} path="/offers/:id" component={OfferViewPage} />
                <PrivateRoute exact={true} path="/offers/add" component={OfferEditPage} />
                <PrivateRoute exact={true} path="/offers" component={OffersPage} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <Route exact={true} path="/login" component={Login} />

                
                <Route exact path="/" render={() => <Redirect to="/offers" />} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                  {isAuthenticated && 
                      <>
                      <IonTabButton tab="tab1" href="/offers">
                        <IonIcon icon={bagOutline} />
                        <IonLabel>Offers</IonLabel>
                      </IonTabButton>

                      {/* <IonTabButton tab="tab2" href="/messages">
                        <IonIcon icon={chatbubbleEllipsesOutline} />
                        <IonLabel>Messages</IonLabel>
                      </IonTabButton> */}

                      <IonTabButton tab="tab3" href="/profile">
                        <IonIcon icon={personOutline} />
                        <IonLabel>Profile</IonLabel>
                      </IonTabButton>
                      </>}
              </IonTabBar>
          </IonTabs>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
    );
}

export default App;

