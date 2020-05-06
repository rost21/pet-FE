import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import ApolloClient from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { split, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { showNotification } from '../utils/notifications';
import { history } from '../../main';
import ROUTES from '../routes';

export const getToken = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return token;
	}
	return undefined;
};

const authLink = setContext(() => {
	const token = getToken();
	return {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
});

// Create an http link:
const httpLink = createUploadLink({
	uri: 'http://127.0.0.1:8001/graphql',
});

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, extensions }) => {
      if (extensions!.code === 'UNAUTHENTICATED') {
        showNotification('Token expired', 'error');
        return history.replace(ROUTES.LOGIN);
      }
      return showNotification(message, 'error');
    });
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
