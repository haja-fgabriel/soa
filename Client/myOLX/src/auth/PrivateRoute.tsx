import React, { useContext } from 'react';
import { IonPage } from '@ionic/react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext, AuthState } from './AuthProvider';
import { assert } from 'console';

export interface PrivateRouteProps {
  component: PropTypes.ReactComponentLike;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, token } = useContext<AuthState>(AuthContext);
  console.log('PrivateRoute render, isAuthenticated', isAuthenticated);
  return (
    <Route {...rest} render={props => {
      if (isAuthenticated) {
        if (!token) {
            return <Redirect to={{ pathname: '/login' }}/>
        }
        // @ts-ignore
        
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/login' }}/>
    }}/>
  );
}
