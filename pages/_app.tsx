import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext } from "../utils/context";
import { FirstConnection } from "../utils/socket";
import { useState } from "react";

const socket = FirstConnection();

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<any>();

  return (
    <AppContext.Provider value={{ user, setUser, socket: socket! }}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
