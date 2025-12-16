"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { SessionProvider, useSession } from "next-auth/react";
import { useMemo } from "react";

// Separate the Client creation to a logical component that has access to session
const AuthApolloProvider = ({ children }) => {
    const { data: session } = useSession();

    const client = useMemo(() => {
        const httpLink = createHttpLink({
            uri: "https://api.github.com/graphql",
        });

        const authLink = setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            const token = session?.accessToken;
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                },
            };
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }, [session?.accessToken]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export function ApolloWrapper({ children }) {
    return (
        <SessionProvider>
            <AuthApolloProvider>{children}</AuthApolloProvider>
        </SessionProvider>
    );
}
