import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import { store } from '../store';
import { history } from '../helpers';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {

  history.navigate = useRouter();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
