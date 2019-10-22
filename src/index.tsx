import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppWithLang from './components/AppWithLang';
import { startLogging } from './utils/log';
startLogging();
ReactDOM.render(<AppWithLang />, document.getElementById('root'));
