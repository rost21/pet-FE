import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import ApolloClient from 'apollo-client';
// import uuid from 'uuid';
import { getMainDefinition } from 'apollo-utilities';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split, from } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { showNotification } from '../utils/notifications';
// import { keycloak } from './keycloak';

// @ts-ignore
// const { GRAPHQL_ENDPOINT, WEBSOCKET_SCHEME } = window && window.ENV;
// const { hostname, port } = new URL(GRAPHQL_ENDPOINT);

export const getToken = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return token;
	}
	return undefined;
};

// export const getSessionId = () => {
//     const sessionId = sessionStorage.getItem('ondemand-session-id');
//     if (sessionId) {
//         return sessionId;
//     }
//     sessionStorage.setItem('ondemand-session-id', uuid());
//     return getSessionId();
// };

// export const getQuoteMspId = () => {
//     const { pathname } = window.location;
//     const quoteParams = pathname.split('quote/');
//     if (quoteParams.length > 1) {
//         return quoteParams[1];
//     }
//     return undefined;
// };

const authLink = setContext(() => {
	const token = getToken();
	// const id = getQuoteMspId();
	return {
		headers: {
			authorization: `Bearer ${token}`,
			// 'session-id': getSessionId(),
			// 'session-quote-id': id,
		},
	};
});

// Create an http link:
const httpLink = createUploadLink({
	uri: 'http://127.0.0.1:8001/graphql',
});

// const wsClient = new SubscriptionClient(`${WEBSOCKET_SCHEME}://${hostname}:${port}/subscriptions`, {
//     reconnect: true,
//     timeout: 30000,
//     lazy: true,
//     connectionParams: () => {
//         const token = getToken();
//         return {
//             headers: {
//                 authorization: `Bearer ${token}`,
//             },
//         };
//     },
//     inactivityTimeout: 0,
// });

// Create a WebSocket link:
// const wsLink = new WebSocketLink(wsClient);

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }) =>
			showNotification(message, 'error'));
	}
});
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = from([
	errorLink,
	split(
		// split based on operation type
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === 'OperationDefinition';
		},
		authLink.concat(httpLink),
	),
]);

const client = new ApolloClient({
	link,
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'ignore',
			fetchPolicy: 'no-cache',
		},
		query: {
			errorPolicy: 'all',
			fetchPolicy: 'no-cache',
		},
		mutate: {
			errorPolicy: 'ignore',
		}
	},
	cache: new InMemoryCache(),
});

export { client };
