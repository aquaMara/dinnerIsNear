import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './auth/AuthProvoder';
import { ShoppingCartProvider } from './auth/ShoppingCartProvider';
import { DeliveryCartProvider } from './auth/DeliveryCartProvider';

export default function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <DeliveryCartProvider>
          <MainNavigation />
        </DeliveryCartProvider>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}
