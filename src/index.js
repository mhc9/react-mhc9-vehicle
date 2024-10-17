import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import OverWriteMomentBE from './utils/OverwriteMomentBE'
import store from './features/store'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                    <App />
                </MuiPickersUtilsProvider>
            </Provider>
        </Router>
    </React.StrictMode>
);
