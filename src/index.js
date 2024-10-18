import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { APIProvider } from '@vis.gl/react-google-maps'
import { ToastContainer } from 'react-toastify';
import OverWriteMomentBE from './utils/OverwriteMomentBE'
import store from './features/store'
import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css'

const GMAP_API_KEY = process.env.REACT_APP_GMAP_API_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <APIProvider apiKey={GMAP_API_KEY}>
                    <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                        <App />
                    </MuiPickersUtilsProvider>
                    <ToastContainer />
                </APIProvider>
            </Provider>
        </Router>
    </React.StrictMode>
);
