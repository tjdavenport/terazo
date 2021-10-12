import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import useAxios from 'axios-hooks';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';

const Mocked = ({Component}) => {
  const [{data: warehouses, loading, error}] = useAxios('http://localhost:1337/v1/warehouses');
  return <Component {...{warehouses, loading, failed: error}}/>;
};

ReactDOM.render(
  <React.StrictMode>
    <Mocked Component={App}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
