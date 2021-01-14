import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import merge from 'deepmerge';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export let apolloClient;

function createApolloClient(locale: string) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://165.227.171.192:3000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers: [
        {
          key: 'lang',
          value: locale,
        },
      ],
    }),
    cache: new InMemoryCache({
      // typePolicies: {
      //   Query: {
      //     fields: {
      //       allPosts: concatPagination(),
      //     },
      //   },
      // },
    }),
  });
}

export function initializeApollo(initialState = null, locale: string) {
  const _apolloClient = apolloClient ?? createApolloClient(locale);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  console.log(_apolloClient, 'apollo client');

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps, locale: string) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state, locale), [state]);
  return store;
}
