import React from 'react';

import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './auth/AuthProvoder';
import { ShoppingCartProvider } from './auth/ShoppingCartProvider';

export default function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <MainNavigation />
      </ShoppingCartProvider>
    </AuthProvider>
  );
}
