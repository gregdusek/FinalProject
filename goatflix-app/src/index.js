import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
import {QueryClientProvider, QueryClient} from 'react-query';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();
const queryClient = new QueryClient();

ReactDOM.render(
<QueryClientProvider client={queryClient}>
        <Router>
            <App />
        </Router>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
</QueryClientProvider>,
document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();