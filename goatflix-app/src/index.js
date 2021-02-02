import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {QueryClientProvider, QueryClient} from 'react-query';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();
const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

ReactDOM.render(
<Provider store={store}>
    <Router>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Router>
</Provider>,
rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();