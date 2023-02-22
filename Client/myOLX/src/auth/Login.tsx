import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonButtons, IonItemDivider, IonListHeader } from '@ionic/react';
import { AuthContext, AuthState } from './AuthProvider';

interface LoginState {
username?: string;
password?: string;
}

const style = {
marginLeft  : "12px",
marginRight : "12px",
marginTop   : "12px"
};

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
const { isAuthenticated, isAuthenticating, login, authenticationError } = useContext<AuthState>(AuthContext);
const [state, setState] = useState<LoginState>({});
const { username, password } = state;
const handleLogin = () => {
    console.log('Login handleLogin...');
    login?.(username, password);
};

console.log('Login render');
if (isAuthenticated) {
    //debugger;
    return <Redirect to={{ pathname: '/' }} />
}
return (
<IonPage>
    <IonHeader translucent={true}>
    <IonToolbar>
        <IonTitle>Welcome!</IonTitle>
    </IonToolbar>
    </IonHeader>
    <IonContent fullscreen={true}>
    <IonHeader collapse="condense">
        <IonToolbar>
        <IonTitle size="large">Welcome!</IonTitle>
        {/* 
        <IonButtons slot="end">
            <IonButton onClick={handleLogin}>Login</IonButton>
            </IonButtons>*/}
        </IonToolbar>
    </IonHeader>
    <IonList>
        <IonListHeader />
        <IonItem>
        <IonLabel position="fixed">Username</IonLabel>
        <IonInput
            placeholder="Username"
            value={username}
            onIonChange={e => setState({
            ...state,
            username: e.detail.value || ''
            })}/>
        </IonItem>
        <IonItem>
        <IonLabel position="fixed">Password</IonLabel>
        <IonInput
            placeholder="Required"
            value={password}
            type="password"
            onIonChange={e => setState({
            ...state,
            password: e.detail.value || ''
            })}/>
        </IonItem>
        
        
    </IonList>
        <IonButton style={style} expand="block" onClick={handleLogin}>
            Login
        </IonButton>
    <IonLoading isOpen={isAuthenticating}/>
    {authenticationError && (
        <div>{authenticationError.message || 'Failed to authenticate'}</div>
    )}
    
    </IonContent>
</IonPage>
);
};
