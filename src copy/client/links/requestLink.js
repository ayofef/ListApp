import { ApolloLink, Observable } from '@apollo/client';
import { localStorageService } from '../../utils/localStorageService';
import { STORAGE_KEYS } from '../../constants/storage';

const request = (operation) => {
  const token = localStorageService.getItem(STORAGE_KEYS.token);
  const customHeaders = operation.getContext()?.headers ?? {};

  operation.setContext({
    headers: {
      ...customHeaders,
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;

      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

export default requestLink;
