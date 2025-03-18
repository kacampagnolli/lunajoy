import "./chartjs";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ServerProvider } from './contexts/ServerContext.tsx';
import { SocketProvider } from "./contexts/SocketContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ServerProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SocketProvider>
      </ServerProvider>
    </AuthProvider>
  </StrictMode>,
)
