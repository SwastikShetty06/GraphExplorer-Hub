import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const getClient = (token) => {
    return new ApolloClient({
        link: createHttpLink({
            uri: "https://api.github.com/graphql",
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            },
        }),
        cache: new InMemoryCache(),
    });
};
