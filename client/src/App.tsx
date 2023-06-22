import './sass/_index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRouter } from './routes/AppRouter';
import { getAuth0Config } from './tools/auth0';

const auth0Config = getAuth0Config();
const queryClient = new QueryClient();

export const App: React.FC = () => (
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId} authorizationParams={{ redirect_uri: window.location.origin }}>
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <AppRouter />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </Auth0Provider>
);
