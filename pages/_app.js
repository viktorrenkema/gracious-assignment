// 🧰 Utils
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ApolloProvider>
  );
}

export default MyApp;
