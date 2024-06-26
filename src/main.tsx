import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@twa-dev/sdk";
import eruda from 'eruda'
import "./index.css";
import { init } from '@tma.js/sdk';
// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

  import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Router,
    RouterProvider,
  } from "react-router-dom";
  import React, { useEffect } from "react";


import Index from './pages/index';
import Game from './pages/game';
// import { SDKProvider, DisplayGate, type SDKInitOptions } from '@tma.js/sdk-react';
import Loading from "./containers/Loading";
eruda.init();

try {
  const { mainButton, viewport } = init({});
  viewport.expand()
} catch (error) {
  
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Index />} />
      <Route path="index" element={<Index />} />
    </Route>
  ),
  {basename: '/tontontonwebapp'}
);


const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// const options: SDKInitOptions = {
// };
interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  return (
    <div className="empty-page">
      Oops. Something went wrong.
      <div>
        <blockquote>
          <code>
            {error instanceof Error
              ? error.message
              : JSON.stringify(error)}
          </code>
        </blockquote>
      </div>
    </div>
  );
}

function SDKProviderLoading() {
  return <div className="empty-page">loading...</div>;
}

function SDKInitialState() {
  return <div className="empty-page">Waiting for initialization to start.</div>;
}

const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        (window as any).Telegram.WebApp.expand()
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }, [])
  return (
    // <SDKProvider options={options}>
    <>
      <Loading></Loading>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <Index />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </>
  // </SDKProvider>
  )
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App></App>
);
