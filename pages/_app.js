import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
